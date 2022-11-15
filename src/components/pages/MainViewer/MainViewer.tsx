import { MainViewerTemplate } from "@/components/templates/MainViewerTemplate"
import { Props as HeaderProps } from "@/components/organisms/Header/type";
import { Props as AgentCardProps } from "@/components/molecules/AgentCard/type";
import { Props as ExplanationModalProps } from "@/components/organisms/ExplanationModal/type";
import { Props as SliderArgsProps } from "@/components/organisms/SliderKit/type";
import { Box, Grid, GridItem, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { GeneralSettingModal } from "@/components/organisms/GeneralSettingModal"
import { generalSettingState as generalSettingStateInitial } from "@/factories/generalSettingStateFactory"
import React, { useEffect } from "react"
import { ExplanationModal } from "@/components/organisms/ExplanationModal";
import { Props } from './type';
import { CivilianExplanationComponent } from "@/factories/civilianExplanationComponent";
import { AmbulanceExplanationComponent } from "@/factories/ambulanceExplanationComponent";
import { FireExplanationComponent } from "@/factories/fireExplanationComponent";
import { PoliceExplanationComponent } from "@/factories/policeExplanationComponent";
import { useTranslation } from "next-i18next";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { Header } from "@/components/organisms/Header";
import { MessageArea } from "@/components/organisms/MessageArea";
import { SideBar } from "@/components/organisms/SideBar";
import { SliderKit } from "@/components/organisms/SliderKit";

export const MainViewer: React.FC<Props> = ({ children, childSliderKitState, score, maxScore }) => {
    const { t, i18n } = useTranslation();

    const [generalSettingState, setGeneralSettingState] = React.useState(generalSettingStateInitial);
    const [modalVisibilityState, setModalVisibilityState] = React.useState({
        civilianExplanationModal: false,
        ambulanceExplanationModal: false,
        fireExplanationModal: false,
        policeExplanationModal: false,
        generalSettingModal: false,
    });

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

    const sideBarInfo = {
        agentDatas: agentDatas,
        linkDatas: linkDatas,
        isShowing: generalSettingState.sideBarVisibility,
    }

    const headerInfo: HeaderProps = {
        stepCount: childSliderKitState.value,
        stepTooltip: t('救助活動の経過時間を表します'),
        score: score,
        maxScore: maxScore,
        scoreTooltip: t('市民の負傷度合いによってスコアが減算されます'),
        isShowing: generalSettingState.headerVisibility,
        onOpenSetting: () => { setModalVisibilityState({ ...modalVisibilityState, generalSettingModal: true }) },
    }

    const sliderArgs: SliderArgsProps = {
        isPlaying: childSliderKitState.isPlaying,
        isDisabled: childSliderKitState.isDisabled,
        isShowing: generalSettingState.sliderKitVisibility,
        value: childSliderKitState.value,
        max: childSliderKitState.max,
        onChange: childSliderKitState.onChange,
        onChangeEnd: childSliderKitState.onChangeEnd,
        onClickPlayButton: childSliderKitState.onClickPlayButton,
    }

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

    const sidebar_width = sideBarInfo.isShowing === "show" ? "300px" : "0px";

    return (
        <>
            <Box overflow={"hidden"} width={"100vw"} height={"100vh"} position={"relative"}>
                <Box position="fixed">
                    <Grid
                        templateAreas={`"header header"
                                        "sidebar main"`}
                        gridTemplateRows={'65px 1fr'}
                        gridTemplateColumns={`${sidebar_width} 1fr`}
                        w={"100vw"}
                        zIndex={2}
                    >
                        <GridItem area={'header'}>
                            <Header {...headerInfo} />
                        </GridItem>
                        <GridItem area={'sidebar'}>
                            <SideBar {...sideBarInfo} />
                        </GridItem>
                        <GridItem area={'main'}>
                            {children}
                        </GridItem>
                    </Grid>
                </Box>
                <Box
                    zIndex={3}
                    width={"80%"}
                    position={"absolute"}
                    bottom={"-25px"}
                    right={"-40px"}
                >
                    <MessageArea isShowing={generalSettingState.characterVisibility} />
                </Box>
                <Box bg="bg" zIndex={3} position="absolute" bottom={0} width="100vw">
                    <Box px={10}>
                        <SliderKit {...sliderArgs} />
                    </Box>
                </Box>
            </Box>
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
}
MainViewer.whyDidYouRender = true;