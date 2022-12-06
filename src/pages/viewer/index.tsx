import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { load } from "@loaders.gl/core";
import { JSONLoader } from "@loaders.gl/json";
import { Props, ToolTipObject } from "@/common/viewer/type";
import { STEP_DULATION } from "@/common/viewer/const";
import { DeckGLWrapper } from "@/components/atoms/DeckGLWrapper";
import { ChildProps as ChildSliderArgsProps } from "@/components/organisms/SliderKit/type";
import { OrbitView } from "@deck.gl/core";
import DeckGL from "@deck.gl/react";

import useAnimation from "@/hooks/useAnimation";
import useScore from "@/hooks/useScore";

import DefaultAgentsLayer from "@/RRSLayers/Agents/DefaultAgentsLayer";
import DefaultBuildingsLayer from "@/RRSLayers/Buildings/DefaultBuildingsLayer";
import DefaultRoadsLayer from "@/RRSLayers/Roads/DefaultRoadsLayer";
import DefaultBlockadesLayer from "@/RRSLayers/Blockades/DefaultBlockadesLayer";
import { Simulation } from "@/lib/RCRS";

const MainViewer = dynamic(
  () => import("src/components/pages/MainViewer").then((cmp) => cmp.MainViewer),
  { ssr: false }
);

const Viewer: NextPage<Props> = ({ mapData, rescueLogData, metaData }) => {
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
  const [simulation, setSimulation] = useState(new Simulation());

  const buildingsLayer = new DefaultBuildingsLayer(mapData, simulation);
  // const roadsLayer = new DefaultRoadsLayer(mapData, simulation);
  // const blockadesLayer = new DefaultBlockadesLayer(mapData, simulation);
  // const agentsLayer = new DefaultAgentsLayer(mapData, simulation);

  const [sliderKitState, setSliderKitState] = React.useState({
    isPlaying: true,
    isDisabled: false,
    value: 0,
    max: maxsteps,
  });

  const sliderArgs: ChildSliderArgsProps = {
    isPlaying: sliderKitState.isPlaying,
    isDisabled: sliderKitState.isDisabled,
    value: sliderKitState.value,
    max: sliderKitState.max - 1, // +1をフェッチしているため表示上は-1する
    onChange: (value: number) => {
      setSliderKitState({ ...sliderKitState, value: value, isPlaying: false });
      setIsPause(!false);
      setStep(value);
      setTime(value * STEP_DULATION);
    },
    onChangeEnd: () => {},
    onClickPlayButton: () => {
      setSliderKitState({
        ...sliderKitState,
        isPlaying: !sliderKitState.isPlaying,
      });
      setIsPause(sliderKitState.isPlaying);
      setTime(step * STEP_DULATION);
    },
  };

  const onStepUpdate = () => {
    async function fetchData() {
      const host = process.env.NEXT_PUBLIC_LOG_HOST;
      const fetchUrl = new URL(
        `/Resources/logs/sample-logs/1-1/${step + 1}`,
        host
      ).href;

      //TODO: fetchUrlからログをフェッチする
      const log = null;
      simulation.process(log);
    }
    if (step === maxsteps - 1) {
      setIsFinished(true);
      console.log("finished");
    } else {
      fetchData();
    }
  };

  const onSimulationUpdate = () => {
    // agentsLayer.setRescueLog(rescuelog);
    buildingsLayer.setSimulation(simulation);
    // roadsLayer.setRescueLog(rescuelog);
    // blockadesLayer.setRescueLog(rescuelog);
  };

  useEffect(() => {
    onStepUpdate();
    setSliderKitState({ ...sliderKitState, value: step });
    setScore(metaData.scores[step]);
  }, [step]);

  useEffect(() => {
    if (time % (STEP_DULATION / 10) === 0) {
      setLayers([
        // buildingsLayer.getLayer(),
        // roadsLayer.getLayer(),
        // blockadesLayer.getLayer(),
        // agentsLayer.getLayer(time),
      ]);
    }
  }, [time]);

  useEffect(() => {
    onSimulationUpdate();
  }, [simulation]);

  const resetViewState = () => {
    setViewState({
      ...viewState,
      target: [0, 0, 0],
      rotationX: 30,
      rotationOrbit: 0,
      zoom: 0.5,
    });
  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <MainViewer
        childSliderKitState={sliderArgs}
        score={score}
        maxScore={maxScore}
      >
        <DeckGLWrapper
          onResetAction={() => {
            resetViewState();
          }}
        >
          <DeckGL
            controller={true}
            layers={layers}
            getTooltip={({ object }: ToolTipObject) =>
              object &&
              `${object.type} (${object.id})\n Position: ${object.x}, ${object.y}`
            }
            views={new OrbitView()}
            viewState={viewState}
            onViewStateChange={({ viewState }: any) => {
              // Z軸方向の操作は無効にする
              viewState.target = [viewState.target[0], viewState.target[1], 0];
              setViewState(viewState);
            }}
            onError={(e: Error) => console.error(e)}
          ></DeckGL>
        </DeckGLWrapper>
      </MainViewer>
    </div>
  );
};

export async function getStaticProps() {
  const host = process.env.NEXT_PUBLIC_LOG_HOST;

  const mapUrl = new URL(
    process.env.NEXT_PUBLIC_DEFAULT_LOG_BASE_PATH + "/map.json",
    host
  ).href;
  const mapData = await load(mapUrl, JSONLoader);

  const rescueLogDataUrl = new URL(
    process.env.NEXT_PUBLIC_DEFAULT_LOG_BASE_PATH + "/full/1.json",
    host
  ).href;
  const rescueLogData = await load(rescueLogDataUrl, JSONLoader);

  const metaUrl = new URL(
    process.env.NEXT_PUBLIC_DEFAULT_LOG_BASE_PATH + "/meta.json",
    host
  ).href;
  const metaData = await load(metaUrl, JSONLoader);
  return {
    props: {
      mapData,
      rescueLogData,
      metaData,
    },
  };
}

export default Viewer;
