import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { load } from "@loaders.gl/core";
import { JSONLoader } from "@loaders.gl/json";
import { LayerEntity, Props, ToolTipObject } from "@/common/viewer/type";
import { MAX, STEP_DULATION } from "@/common/viewer/const";
import { ChildProps as ChildSliderArgsProps } from "@/components/organisms/SliderKit/type";

import useAnimation from "@/hooks/useAnimation";
import useScore from "@/hooks/useScore";

import { useTranslation } from "next-export-i18n";
import useLog from "@/hooks/useLog";
import RRSViewer from "@/components/pages/RRSViewer/RRSViewer";
import Slider from "@/components/pages/Slider/Slider";
import SideBarComponent from "@/components/pages/SideBarComponent/SideBarComponent";
import HeaderComponent from "@/components/pages/HeaderComponent/HeaderComponent";
import { Box } from "@chakra-ui/react";

const MainViewer = dynamic(
  () => import("src/components/pages/MainViewer").then((cmp) => cmp.MainViewer),
  { ssr: false }
);

const Viewer: NextPage<Props> = ({ mapData, rescueLogData, metaData }) => {
  const { t } = useTranslation();

  const maxsteps = 300; //TODO
  const maxScore = 1000; //TODO

  const { time, step, isPause, setStep, setTime, setIsPause } =
    useAnimation(maxsteps);
  const { score, setScore } = useScore(maxScore);
  const { simulation, setSimulation, setLogMaxStepToLoad } = useLog();

  useEffect(() => {
    const processedTimeStep = simulation.getTotalTimeSteps();

    // 次に読み込むステップ読み込めていなかったら再生を一時停止する
    if (step === processedTimeStep + 1) {
      setIsPause(true);
    }

    // ステップ数が読み込みステップより大きいときは、ステップを戻す
    if (step > processedTimeStep + 1) {
      setStep(step - 1);
      setIsPause(true);
      return;
    }

    //ログの読み込み（引数で指定したステップまで読み込む）
    setLogMaxStepToLoad(step);

    // TODO: ヘッダーのコンポーネントに移す
    //スコアの計算
    simulation.getWorld(step).then((world) => {
      setScore(world.getScore());
    });
  }, [step]);

  return (
    <Box position="fixed" top={0} left={0} width="100vw" height="100vh" overflow="hidden">
      <HeaderComponent step={step} score={score} maxScore={maxScore} />
      <RRSViewer
        simulation={simulation}
        time={time}
        step={step}
        translation={t}
      />
      <SideBarComponent />
      <Slider
        simulation={simulation}
        step={step}
        maxsteps={maxsteps}
        setIsPause={setIsPause}
        setStep={setStep}
        setTime={setTime}
      />
    </Box>
  );
};
export default Viewer;
