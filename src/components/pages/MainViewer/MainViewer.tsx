import { MainViewerTemplate } from "@/components/templates/MainViewerTemplate"
import { linkDatas } from "src/factories/linkDatasFactory"
import { Props as HeaderProps } from "@/components/organisms/Header/type";
import { Props as AgentCardProps } from "@/components/molecules/AgentCard/type";
import { Props as ExplanationModalProps } from "@/components/organisms/ExplanationModal/type";
import { Props as SliderArgsProps } from "@/components/organisms/SliderKit/type";
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { GeneralSettingModal } from "@/components/organisms/GeneralSettingModal"
import { generalSettingState as generalSettingStateInitial } from "@/factories/generalSettingStateFactory"
import React, { useEffect } from "react"
import { ExplanationModal } from "@/components/organisms/ExplanationModal";
import { Props } from './type';
import { CivilianExplanationComponent } from "@/factories/civilianExplanationComponent";
import { AmbulanceExplanationComponent } from "@/factories/ambulanceExplanationComponent";
import { FireExplanationComponent } from "@/factories/fireExplanationComponent";
import { PoliceExplanationComponent } from "@/factories/policeExplanationComponent";

export const MainViewer: React.FC<Props> = ({ children, childSliderKitState, score, maxScore }) => {

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
            title: '市民',
            description: '市民の説明を開く',
            onClick: () => { setModalVisibilityState({ ...modalVisibilityState, civilianExplanationModal: true }) },
        },
        {
            agentType: 'ambulance',
            title: '救急隊',
            description: '救急隊の説明を開く',
            onClick: () => { setModalVisibilityState({ ...modalVisibilityState, ambulanceExplanationModal: true }) },
        },
        {
            agentType: 'fire',
            title: '消防隊',
            description: '消防隊の説明を開く',
            onClick: () => { setModalVisibilityState({ ...modalVisibilityState, fireExplanationModal: true }) },
        },
        {
            agentType: 'police',
            title: '土木隊',
            description: '土木隊の説明を開く',
            onClick: () => { setModalVisibilityState({ ...modalVisibilityState, policeExplanationModal: true }) },
        },
    ]

    const sideBarInfo = {
        agentDatas: agentDatas,
        linkDatas: linkDatas,
        isShowing: generalSettingState.sideBarVisibility,
    }

    const headerInfo: HeaderProps = {
        stepCount: childSliderKitState.value,
        stepTooltip: '救助活動の進行度を表します',
        score: score,
        maxScore: maxScore,
        scoreTooltip: '救助活動によってスコアが減算されます',
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
        title: '市民の説明',
        children: <CivilianExplanationComponent />,
        isOpen: modalVisibilityState.civilianExplanationModal,
        onClose: () => { setModalVisibilityState({ ...modalVisibilityState, civilianExplanationModal: false }) },
        agentType: 'civilian',
    }

    const ambulanceExplanationData: ExplanationModalProps = {
        title: '救急隊の説明',
        children: <AmbulanceExplanationComponent />,
        isOpen: modalVisibilityState.ambulanceExplanationModal,
        onClose: () => { setModalVisibilityState({ ...modalVisibilityState, ambulanceExplanationModal: false }) },
        agentType: 'ambulance',
    }

    const fireExplanationData: ExplanationModalProps = {
        title: '消防隊の説明',
        children: <FireExplanationComponent />,
        isOpen: modalVisibilityState.fireExplanationModal,
        onClose: () => { setModalVisibilityState({ ...modalVisibilityState, fireExplanationModal: false }) },
        agentType: 'fire',
    }

    const policeExplanationData: ExplanationModalProps = {
        title: '土木隊の説明',
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

    return (
        <>
            <MainViewerTemplate
                sideBarInfo={sideBarInfo}
                headerInfo={headerInfo}
                characterIsShowing={generalSettingState.characterVisibility}
                sliderArgs={sliderArgs}
            >
                {children ? children : <Box bg="green.700" w="100vw" h="100vh"></Box>}
            </MainViewerTemplate>
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