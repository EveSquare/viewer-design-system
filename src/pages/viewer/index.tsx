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
import Widget from "@/components/pages/Widget/Widget";
import Slider from "@/components/pages/Slider/Slider";
import SideBarComponent from "@/components/pages/SideBarComponent/SideBarComponent";
import HeaderComponent from "@/components/pages/HeaderComponent/HeaderComponent";
import { Box, HStack } from "@chakra-ui/react";

const MainViewer = dynamic(
  () => import("src/components/pages/MainViewer").then((cmp) => cmp.MainViewer),
  { ssr: false }
);

const Viewer: NextPage<Props> = ({ mapData, rescueLogData, metaData }) => {
  const { t } = useTranslation();

  const maxsteps = 300; //TODO

  const { time, step, isPause, setStep, setTime, setIsPause } =
    useAnimation(maxsteps);
  const { score, setScore, maxScore, setMaxScore } = useScore(0);
  const { simulation, setSimulation, setLogMaxStepToLoad } = useLog();

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

  const {
    simulation: simulationSub,
    setSimulation: setSimulationSub,
    setLogMaxStepToLoad: setLogMaxStepToLoadSub,
  } = useLog();

  const [enabledLayers, setEnabledLayers] = useState([true, true, true, true]);
  const [filter, setFilter] = useState({
    agents: {
      id: null,
      type: {
        civilian: true,
        police: true,
        fire: true,
        ambulance: true,
      },
    },
  });

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
      const score = world.getScore();
      if (maxScore === 0) {
        setMaxScore(score);
      }
      setScore(score);
    });
  }, [step]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      overflow="hidden"
    >
      <HeaderComponent step={step} score={score} maxScore={maxScore} />
      <HStack width="100vw" height="100vh" paddingLeft="300px">
        <RRSViewer
          simulation={simulation}
          time={time}
          step={step}
          translation={t}
          filter={filter}
          enabledLayers={enabledLayers}
          viewState={viewState}
          setViewState={setViewState}
        />
        <RRSViewer
          simulation={simulation}
          time={time}
          step={step}
          translation={t}
          filter={filter}
          enabledLayers={enabledLayers}
          viewState={viewState}
          setViewState={setViewState}
        />
      </HStack>
      {/* <SideBarComponent /> */}
      <Slider
        simulation={simulation}
        step={step}
        maxsteps={maxsteps}
        setIsPause={setIsPause}
        setStep={setStep}
        setTime={setTime}
      />
      <Widget
        filter={filter}
        setFilter={setFilter}
        enabledLayers={enabledLayers}
        setEnabledLayers={setEnabledLayers}
      />
    </Box>
  );
};
export default Viewer;
