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

export const MainViewer: React.FC = () => {

    const [generalSettingState, setGeneralSettingState] = React.useState(generalSettingStateInitial);
    const [modalVisibilityState, setModalVisibilityState] = React.useState({
        civilianExplanationModal: false,
        ambulanceExplanationModal: false,
        fireExplanationModal: false,
        generalSettingModal: false,
    });
    const [sliderKitState, setSliderKitState] = React.useState({
        isPlaying: true,
        isDisabled: false,
        value: 0,
        max: 100,
    });

    const agentDatas: Array<AgentCardProps> = [
        {
            agentType: 'civilian',
            title: '市民',
            description: '市民の説明',
            onClick: () => { setModalVisibilityState({ ...modalVisibilityState, civilianExplanationModal: true }) },
        },
        {
            agentType: 'ambulance',
            title: '救急隊',
            description: '救急隊の説明',
            onClick: () => { setModalVisibilityState({ ...modalVisibilityState, ambulanceExplanationModal: true }) },
        },
        {
            agentType: 'fire',
            title: '消防隊',
            description: '消防隊の説明',
            onClick: () => { setModalVisibilityState({ ...modalVisibilityState, fireExplanationModal: true }) },
        },
    ]

    const sideBarInfo = {
        agentDatas: agentDatas,
        linkDatas: linkDatas,
        isShowing: generalSettingState.sideBarVisibility,
    }

    const headerInfo: HeaderProps = {
        stepCount: 10,
        stepTooltip: 'ここには、ステップ数が表示されます',
        score: 100,
        scoreTooltip: 'ここには、スコアが表示されます',
        isShowing: generalSettingState.headerVisibility,
        onOpenSetting: () => { setModalVisibilityState({ ...modalVisibilityState, generalSettingModal: true }) },
    }

    const sliderArgs: SliderArgsProps = {
        isPlaying: sliderKitState.isPlaying,
        isDisabled: sliderKitState.isDisabled,
        isShowing: generalSettingState.sliderKitVisibility,
        value: sliderKitState.value,
        max: sliderKitState.max,
        onChange: (value: number) => { setSliderKitState({ ...sliderKitState, value: value }) },
        onChangeEnd: () => { },
        onClickPlayButton: () => { setSliderKitState({ ...sliderKitState, isPlaying: !sliderKitState.isPlaying }) },
    }

    const civilianExplanationData: ExplanationModalProps = {
        title: '市民の説明',
        children: <></>,
        isOpen: modalVisibilityState.civilianExplanationModal,
        onClose: () => { setModalVisibilityState({ ...modalVisibilityState, civilianExplanationModal: false }) },
        agentType: 'civilian',
    }

    const ambulanceExplanationData: ExplanationModalProps = {
        title: '救急隊の説明',
        children: <></>,
        isOpen: modalVisibilityState.ambulanceExplanationModal,
        onClose: () => { setModalVisibilityState({ ...modalVisibilityState, ambulanceExplanationModal: false }) },
        agentType: 'ambulance',
    }

    const fireExplanationData: ExplanationModalProps = {
        title: '消防隊の説明',
        children: <></>,
        isOpen: modalVisibilityState.fireExplanationModal,
        onClose: () => { setModalVisibilityState({ ...modalVisibilityState, fireExplanationModal: false }) },
        agentType: 'fire',
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
                <Box bg="green.700" w="100vw" h="100vh"></Box>
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
        </>
    )
}