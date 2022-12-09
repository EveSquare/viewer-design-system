import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { load } from "@loaders.gl/core";
import { JSONLoader } from "@loaders.gl/json";
import { LayerEntity, Props, ToolTipObject } from "@/common/viewer/type";
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
import { useTranslation } from "next-export-i18n";

const MainViewer = dynamic(
  () => import("src/components/pages/MainViewer").then((cmp) => cmp.MainViewer),
  { ssr: false }
);

const Viewer: NextPage<Props> = ({ mapData, rescueLogData, metaData }) => {
  const { t } = useTranslation();

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

  const [buildingsLayer, setBuildingsLayer] = useState(
    new DefaultBuildingsLayer(mapData)
  );
  const [roadsLayer, setRoadsLayer] = useState(new DefaultRoadsLayer(mapData));
  const [agentsLayer, setAgentsLayer] = useState(
    new DefaultAgentsLayer(mapData)
  );
  const [blockadesLayer, setBlockadesLayer] = useState(
    new DefaultBlockadesLayer(mapData)
  );

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

  const onStepUpdate = () => {
    async function fetchData() {
      const host = process.env.NEXT_PUBLIC_LOG_HOST;
      const fetchUrl = new URL(
        `/Resources/logs/sample-logs/1-2/${step + 1}`,
        host
      ).href;

      //TODO: 0が0ステップ目のログではないのでバグってる（0はConfigのログ入ってる）
      const log = await fetch(fetchUrl)
        .then((res) => res.arrayBuffer())
        .then((buf) => {
          return new Uint8Array(buf);
        });
      simulation.process(log);
    }
    if (step === maxsteps - 1) {
      setIsFinished(true);
      console.log("finished");
    } else {
      fetchData();
    }
  };

  useEffect(() => {
    onStepUpdate();
    setSliderKitState({ ...sliderKitState, value: step });
    setScore(simulation.getWorld(step).getScore());
  }, [step]);

  useEffect(() => {
    if (time % (STEP_DULATION / 10) === 0) {
      setLayers([
        buildingsLayer.getLayer(step, simulation),
        roadsLayer.getLayer(step, simulation),
        blockadesLayer.getLayer(step, simulation),
        agentsLayer.getLayer(step, time, simulation),
      ]);
    }
  }, [time]);

  const resetViewState = () => {
    setViewState({
      ...viewState,
      target: [0, 0, 0],
      rotationX: 30,
      rotationOrbit: 0,
      zoom: 0.5,
    });
  };

  function getToolTip(object: LayerEntity) {
    if (!object) return;

    switch (object.type) {
      case "REFUGE":
        const bedCapacity = Array(object.bedCapacity).fill("🛏️");
        const occupiedBeds = Array(object.occupiedBeds).fill("🛌");
        const waitingListSize = Array(object.waitingListSize).fill("👥");
        // const refillCapacity = Array(object.refillCapacity).fill("🚰");

        const bedInfo = Object.assign(bedCapacity, occupiedBeds).join(" | ");
        const waitingListInfo = waitingListSize.join(" | ");

        return `${t("ベッド空き状況")}(${occupiedBeds.length}/${bedCapacity.length})
                ${bedInfo}
                ${t("待ち人数")}(${waitingListSize.length}${t("人")})
                ${waitingListInfo}`;
      default:
        return `${object.type} (${object.id})\n Position: ${object.x}, ${object.y}`
    }
  }

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
            getTooltip={({ object }: ToolTipObject) => getToolTip(object)}
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
