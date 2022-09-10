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
import { Props } from "./type";

export const MainViewer: React.FC<Props> = ({
    sideBarInfo,
    headerInfo,
    generalSettingState,
    sliderArgs,
    modalVisibilityState,
    civilianExplanationData,
    ambulanceExplanationData,
    fireExplanationData,
    setGeneralSettingState,
    setModalVisibilityState,
}) => {

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