import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from 'react';
import { load } from '@loaders.gl/core';
import { JSONLoader } from '@loaders.gl/json';
import { Props, ToolTipObject } from '@/common/viewer/type';
import { STEP_DULATION } from '@/common/viewer/const';
import { DeckGLWrapper } from "@/components/atoms/DeckGLWrapper";
import { ChildProps as ChildSliderArgsProps } from "@/components/organisms/SliderKit/type";
import { OrbitView } from "@deck.gl/core";
import DeckGL from "@deck.gl/react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import useAnimation from "@/hooks/useAnimation";
import useScore from "@/hooks/useScore";

import DefaultAgentsLayer from "@/RRSLayers/Agents/DefaultAgentsLayer";
import DefaultBuildingsLayer from "@/RRSLayers/Buildings/DefaultBuildingsLayer";
import DefaultRoadsLayer from "@/RRSLayers/Roads/DefaultRoadsLayer";
import DefaultBlockadesLayer from "@/RRSLayers/Blockades/DefaultBlockadesLayer";
import { Box, Grid, GridItem, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Header } from "@/components/organisms/Header";
import { SideBar } from "@/components/organisms/SideBar";
import { MessageArea } from "@/components/organisms/MessageArea";
import { SliderKit } from "@/components/organisms/SliderKit";
import { GeneralSettingModal } from "@/components/organisms/GeneralSettingModal";
import { ExplanationModal } from "@/components/organisms/ExplanationModal";

import { Props as HeaderProps } from "@/components/organisms/Header/type";
import { Props as AgentCardProps } from "@/components/molecules/AgentCard/type";
import { Props as ExplanationModalProps } from "@/components/organisms/ExplanationModal/type";
import { Props as SliderArgsProps } from "@/components/organisms/SliderKit/type";
import { useTranslation } from "next-i18next";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { generalSettingState as generalSettingStateInitial } from "@/factories/generalSettingStateFactory"
import { CivilianExplanationComponent } from "@/factories/civilianExplanationComponent";
import { AmbulanceExplanationComponent } from "@/factories/ambulanceExplanationComponent";
import { FireExplanationComponent } from "@/factories/fireExplanationComponent";
import { PoliceExplanationComponent } from "@/factories/policeExplanationComponent";

const MainViewer = dynamic(
    () => import("src/components/pages/MainViewer").then((cmp) => cmp.MainViewer),
    { ssr: false }
);

const Viewer: NextPage<Props> = ({ mapData, rescueLogData, metaData }) => {
    const { t, i18n } = useTranslation();

    const maxsteps = metaData.maxTimeStep;
    const maxScore = Math.round(metaData.scores[0] * 100) / 100;

    const [layers, setLayers] = useState<any>([]);
    const [viewState, setViewState] = useState<any>({
        width: globalThis.window?.innerWidth,
        height: globalThis.window?.innerHeight,
        target: [0, 0, 0],
        rotationX: 30,
        rotationOrbit: 0,
        zoom: 0.5,
        minZoom: 0,
        maxZoom: 20,
    });

    const { time, step, isPause, setStep, setTime, setIsPause } =
        useAnimation(maxsteps);
    const { score, setScore } = useScore(maxScore);
    const [isFinished, setIsFinished] = useState(false);
    const [rescuelog, setRescueLog] = useState(rescueLogData);

    const buildingsLayer = new DefaultBuildingsLayer(mapData, rescuelog);
    const roadsLayer = new DefaultRoadsLayer(mapData, rescuelog);
    const blockadesLayer = new DefaultBlockadesLayer(mapData, rescuelog);
    const agentsLayer = new DefaultAgentsLayer(mapData, rescuelog);

    const [sliderKitState, setSliderKitState] = React.useState({
        isPlaying: true,
        isDisabled: false,
        value: 0,
        max: maxsteps,
    });

    const onStepUpdate = () => {
        async function fetchData() {
            const host = process.env.NEXT_PUBLIC_LOG_HOST;
            const featch_url = new URL(process.env.NEXT_PUBLIC_DEFAULT_LOG_BASE_PATH + `/full/${step + 1}.json`, host).href;
            const log = await load(featch_url, JSONLoader);
            setRescueLog(log);
        }
        if (step === maxsteps - 1) {
            setIsFinished(true);
            console.log("finished");
        } else {
            fetchData();
        };
    };

    const onRescueLogUpdate = () => {
        agentsLayer.setRescueLog(rescuelog);
        buildingsLayer.setRescueLog(rescuelog);
        roadsLayer.setRescueLog(rescuelog);
        blockadesLayer.setRescueLog(rescuelog);
    };

    useEffect(() => {
        onStepUpdate();
        setSliderKitState({ ...sliderKitState, value: step });
        setScore(metaData.scores[step]);
    }, [step]);

    useEffect(() => {
        if (time % 6 === 0) { // stepduration / 10
            setLayers([
                buildingsLayer.getLayer(),
                roadsLayer.getLayer(),
                blockadesLayer.getLayer(),
                agentsLayer.getLayer(time),
            ]);
        }
    }, [time]);

    useEffect(() => {
        onRescueLogUpdate();
    }, [rescuelog]);

    const [generalSettingState, setGeneralSettingState] = React.useState(generalSettingStateInitial);
    const [modalVisibilityState, setModalVisibilityState] = React.useState({
        civilianExplanationModal: false,
        ambulanceExplanationModal: false,
        fireExplanationModal: false,
        policeExplanationModal: false,
        generalSettingModal: false,
    });

    const sliderArgs: SliderArgsProps = {
        isPlaying: sliderKitState.isPlaying,
        isDisabled: sliderKitState.isDisabled,
        value: sliderKitState.value,
        max: sliderKitState.max - 1, // +1をフェッチしているため表示上は-1する
        isShowing: generalSettingState.sliderKitVisibility,
        onChange: (value: number) => {
            setSliderKitState({ ...sliderKitState, value: value, isPlaying: false });
            setIsPause(!false);
            setStep(value);
            setTime(value * STEP_DULATION);
        },
        onChangeEnd: () => { },
        onClickPlayButton: () => {
            setSliderKitState({
                ...sliderKitState,
                isPlaying: !sliderKitState.isPlaying,
            });
            setIsPause(sliderKitState.isPlaying);
            setTime(step * STEP_DULATION);
        },
    };

    const agentDatas: Array<AgentCardProps> = [
        {
            agentType: 'civilian',
            title: t('市民'),
            description: t('市民の説明を開く'),
            onClick: () => { setModalVisibilityState({ ...modalVisibilityState, civilianExplanationModal: true }) },
        },
        {
            agentType: 'ambulance',
            title: t('救急隊'),
            description: t('救急隊の説明を開く'),
            onClick: () => { setModalVisibilityState({ ...modalVisibilityState, ambulanceExplanationModal: true }) },
        },
        {
            agentType: 'fire',
            title: t('消防隊'),
            description: t('消防隊の説明を開く'),
            onClick: () => { setModalVisibilityState({ ...modalVisibilityState, fireExplanationModal: true }) },
        },
        {
            agentType: 'police',
            title: t('土木隊'),
            description: t('土木隊の説明を開く'),
            onClick: () => { setModalVisibilityState({ ...modalVisibilityState, policeExplanationModal: true }) },
        },
    ]

    const linkDatas = [
        {
            prependIcon: <QuestionOutlineIcon w={5} h={5} />,
            title: t('RRSとは'),
            href: '/explanation/chapter1/whatisrrs'
        },
        {
            prependIcon: <QuestionOutlineIcon w={5} h={5} />,
            title: t('エージェントとは'),
            href: '/explanation/chapter1/whatistheagent'
        }
    ]

    // const sideBarInfo = {
    //     agentDatas: agentDatas,
    //     linkDatas: linkDatas,
    //     isShowing: generalSettingState.sideBarVisibility,
    // }

    // const headerInfo: HeaderProps = {
    //     stepCount: sliderArgs.value,
    //     stepTooltip: t('救助活動の経過時間を表します'),
    //     score: score,
    //     maxScore: maxScore,
    //     scoreTooltip: t('市民の負傷度合いによってスコアが減算されます'),
    //     isShowing: generalSettingState.headerVisibility,
    //     onOpenSetting: () => { setModalVisibilityState({ ...modalVisibilityState, generalSettingModal: true }) },
    // }

    const civilianExplanationData: ExplanationModalProps = {
        title: t('市民の説明'),
        children: <CivilianExplanationComponent />,
        isOpen: modalVisibilityState.civilianExplanationModal,
        onClose: () => { setModalVisibilityState({ ...modalVisibilityState, civilianExplanationModal: false }) },
        agentType: 'civilian',
    }

    const ambulanceExplanationData: ExplanationModalProps = {
        title: t('救急隊の説明'),
        children: <AmbulanceExplanationComponent />,
        isOpen: modalVisibilityState.ambulanceExplanationModal,
        onClose: () => { setModalVisibilityState({ ...modalVisibilityState, ambulanceExplanationModal: false }) },
        agentType: 'ambulance',
    }

    const fireExplanationData: ExplanationModalProps = {
        title: t('消防隊の説明'),
        children: <FireExplanationComponent />,
        isOpen: modalVisibilityState.fireExplanationModal,
        onClose: () => { setModalVisibilityState({ ...modalVisibilityState, fireExplanationModal: false }) },
        agentType: 'fire',
    }

    const policeExplanationData: ExplanationModalProps = {
        title: t('土木隊の説明'),
        children: <PoliceExplanationComponent />,
        isOpen: modalVisibilityState.policeExplanationModal,
        onClose: () => { setModalVisibilityState({ ...modalVisibilityState, policeExplanationModal: false }) },
        agentType: 'police',
    }

    const { toggleColorMode } = useColorMode()
    const nextMode = useColorModeValue("dark", "light")

    useEffect(() => {
        if (nextMode === generalSettingState.colorMode) {
            toggleColorMode();
        }
    }, [generalSettingState.colorMode, nextMode, toggleColorMode]);

    // const sidebar_width = sideBarInfo.isShowing === "show" ? "300px" : "0px";
    const ModelComponents = useMemo(() => {
        return (
            <>
                <GeneralSettingModal
                    isOpen={modalVisibilityState.generalSettingModal}
                    state={generalSettingState}
                    setState={setGeneralSettingState}
                    onClose={() => { setModalVisibilityState({ ...modalVisibilityState, generalSettingModal: false }) }}
                ></GeneralSettingModal>
                <ExplanationModal {...civilianExplanationData} />
                <ExplanationModal {...ambulanceExplanationData} />
                <ExplanationModal {...fireExplanationData} />
                <ExplanationModal {...policeExplanationData} />
            </>
        )
    }, [modalVisibilityState]);

    return (
        <>
            <Box overflow={"hidden"} width={"100vw"} height={"100vh"} position={"relative"}>
                <DeckGL
                    controller={{ inertia: false, minRotationX: 0, dragMode: "pan" }}
                    layers={layers}
                    getTooltip={({ object }: ToolTipObject) => object && `${object.type} (${object.id})\n Position: ${object.x}, ${object.y}`}
                    views={new OrbitView()}
                    viewState={viewState}
                    onViewStateChange={({ viewState }: any) => {
                        // Z軸方向の操作は無効にする
                        viewState.target = [viewState.target[0], viewState.target[1], 0];

                        setViewState(viewState);
                    }}
                    onError={(e: Error) => console.error(e)}
                ></DeckGL>
            </Box>
            {ModelComponents}
        </>
    );
};

export async function getStaticProps({ locale }: any) {
    const host = process.env.NEXT_PUBLIC_LOG_HOST;

    const mapUrl = new URL(process.env.NEXT_PUBLIC_DEFAULT_LOG_BASE_PATH + "/map.json", host).href;
    const mapData = await load(mapUrl, JSONLoader);

    const rescueLogDataUrl = new URL(process.env.NEXT_PUBLIC_DEFAULT_LOG_BASE_PATH + "/full/1.json", host).href;
    const rescueLogData = await load(rescueLogDataUrl, JSONLoader);

    const metaUrl = new URL(process.env.NEXT_PUBLIC_DEFAULT_LOG_BASE_PATH + "/meta.json", host).href;
    const metaData = await load(metaUrl, JSONLoader);
    return {
        props: {
            mapData,
            rescueLogData,
            metaData,
            ...(await serverSideTranslations(locale, ['common']))
        },
    };
}

Viewer.whyDidYouRender = true;
export default Viewer;
