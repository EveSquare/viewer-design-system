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
import { Header } from "@/components/organisms/Header";

type Props = {
  step: number;
  score: number;
  maxScore: number;
};

const HeaderComponent = ({ ...props }: Props) => {
  const { t } = useTranslation();

  const headerInfo: HeaderProps = {
    stepCount: props.step,
    stepTooltip: t("救助活動の経過時間を表します"),
    score: props.score,
    maxScore: props.maxScore,
    scoreTooltip: t("市民の負傷度合いによってスコアが減算されます"),
    isShowing: "show", //TODO
    onOpenSetting: () => {
      // setModalVisibilityState({
      //   ...modalVisibilityState,
      //   generalSettingModal: true,
      // });
    },
  };

  return (
    <Box
      id="Header"
      width="100vw"
      position="fixed"
      left="0"
      top="0"
      zIndex="2"
    >
      <Header {...headerInfo} />
    </Box>
  );
};
export default HeaderComponent;
