import { MainViewerTemplate } from "@/components/templates/MainViewerTemplate";
import { Props as HeaderProps } from "@/components/organisms/Header/type";
import { Props as AgentCardProps } from "@/components/molecules/AgentCard/type";
import { Props as ExplanationModalProps } from "@/components/organisms/ExplanationModal/type";
import { Props as SliderArgsProps } from "@/components/organisms/SliderKit/type";
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { GeneralSettingModal } from "@/components/organisms/GeneralSettingModal";
import { generalSettingState as generalSettingStateInitial } from "@/factories/generalSettingStateFactory";
import React, { useEffect } from "react";
import { ExplanationModal } from "@/components/organisms/ExplanationModal";
import { CivilianExplanationComponent } from "@/factories/civilianExplanationComponent";
import { AmbulanceExplanationComponent } from "@/factories/ambulanceExplanationComponent";
import { FireExplanationComponent } from "@/factories/fireExplanationComponent";
import { PoliceExplanationComponent } from "@/factories/policeExplanationComponent";
import { useTranslation } from "next-export-i18n";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { SideBar } from "@/components/organisms/SideBar";

const SideBarComponent = () => {
  const { t } = useTranslation();

  const [modalVisibilityState, setModalVisibilityState] = React.useState({
    civilianExplanationModal: false,
    ambulanceExplanationModal: false,
    fireExplanationModal: false,
    policeExplanationModal: false,
    generalSettingModal: false,
  });

  const agentDatas: Array<AgentCardProps> = [
    {
      agentType: "civilian",
      title: t("市民"),
      description: t("市民の説明を開く"),
      onClick: () => {
        setModalVisibilityState({
          ...modalVisibilityState,
          civilianExplanationModal: true,
        });
      },
    },
    {
      agentType: "ambulance",
      title: t("救急隊"),
      description: t("救急隊の説明を開く"),
      onClick: () => {
        setModalVisibilityState({
          ...modalVisibilityState,
          ambulanceExplanationModal: true,
        });
      },
    },
    {
      agentType: "fire",
      title: t("消防隊"),
      description: t("消防隊の説明を開く"),
      onClick: () => {
        setModalVisibilityState({
          ...modalVisibilityState,
          fireExplanationModal: true,
        });
      },
    },
    {
      agentType: "police",
      title: t("土木隊"),
      description: t("土木隊の説明を開く"),
      onClick: () => {
        setModalVisibilityState({
          ...modalVisibilityState,
          policeExplanationModal: true,
        });
      },
    },
  ];

  const linkDatas = [
    {
      prependIcon: <QuestionOutlineIcon w={5} h={5} />,
      title: t("RRSとは"),
      href: "/explanation/chapter1/whatisrrs",
    },
    {
      prependIcon: <QuestionOutlineIcon w={5} h={5} />,
      title: t("エージェントとは"),
      href: "/explanation/chapter1/whatistheagent",
    },
    {
      prependIcon: <QuestionOutlineIcon w={5} h={5} />,
      title: t("操作方法"),
      href: "/explanation/howtouse",
    },
  ];

  const sideBarInfo = {
    agentDatas: agentDatas,
    linkDatas: linkDatas,
    isShowing: "show", //TODO
  };

  const civilianExplanationData: ExplanationModalProps = {
    title: t("市民の説明"),
    children: <CivilianExplanationComponent />,
    isOpen: modalVisibilityState.civilianExplanationModal,
    onClose: () => {
      setModalVisibilityState({
        ...modalVisibilityState,
        civilianExplanationModal: false,
      });
    },
    agentType: "civilian",
  };

  const ambulanceExplanationData: ExplanationModalProps = {
    title: t("救急隊の説明"),
    children: <AmbulanceExplanationComponent />,
    isOpen: modalVisibilityState.ambulanceExplanationModal,
    onClose: () => {
      setModalVisibilityState({
        ...modalVisibilityState,
        ambulanceExplanationModal: false,
      });
    },
    agentType: "ambulance",
  };

  const fireExplanationData: ExplanationModalProps = {
    title: t("消防隊の説明"),
    children: <FireExplanationComponent />,
    isOpen: modalVisibilityState.fireExplanationModal,
    onClose: () => {
      setModalVisibilityState({
        ...modalVisibilityState,
        fireExplanationModal: false,
      });
    },
    agentType: "fire",
  };

  const policeExplanationData: ExplanationModalProps = {
    title: t("土木隊の説明"),
    children: <PoliceExplanationComponent />,
    isOpen: modalVisibilityState.policeExplanationModal,
    onClose: () => {
      setModalVisibilityState({
        ...modalVisibilityState,
        policeExplanationModal: false,
      });
    },
    agentType: "police",
  };

  return (
    <Box id="SideBar" height="calc(100vh - 65px)" position="fixed" left="0" top="65px" zIndex="2">
      <SideBar {...sideBarInfo} />
      <ExplanationModal {...civilianExplanationData} />
      <ExplanationModal {...ambulanceExplanationData} />
      <ExplanationModal {...fireExplanationData} />
      <ExplanationModal {...policeExplanationData} />
    </Box>
  );
};
export default SideBarComponent;
