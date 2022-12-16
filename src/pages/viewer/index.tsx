import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { load } from "@loaders.gl/core";
import { JSONLoader } from "@loaders.gl/json";
import { LayerEntity, Props, ToolTipObject } from "@/common/viewer/type";
import { MAX, STEP_DULATION } from "@/common/viewer/const";
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
import useLog from "@/hooks/useLog";

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
  const { simulation, setSimulation, setLogMaxStepToLoad, isLoading } =
    useLog();
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
    isPlaying: false,
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

    setSliderKitState({ ...sliderKitState, value: step });

    let score = 0;
    simulation.getWorld(step).then((world) => {
      score = world.getScore();
      setScore(score);
    });
  }, [step]);

  useEffect(() => {
    if (time % (STEP_DULATION / 10) === 0) {
      (async () => {
        let layer = [];
        layer.push(await buildingsLayer.getLayer(step, simulation))
        layer.push(await agentsLayer.getLayer(step, time, simulation));
        layer.push(await roadsLayer.getLayer(step, simulation));
        layer.push(await blockadesLayer.getLayer(step, simulation));

        setLayers(layer);
      })();
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

  const ZOOM_RATE = 0.1;
  const zoomInViewState = () => {
    setViewState({
      ...viewState,
      zoom: viewState.zoom + ZOOM_RATE,
    });
  };

  const zoomOutViewState = () => {
    setViewState({
      ...viewState,
      zoom: viewState.zoom - ZOOM_RATE,
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

        return `${t("ベッド空き状況")}(${occupiedBeds.length}/${bedCapacity.length
          })
                ${bedInfo}
                ${t("待ち人数")}(${waitingListSize.length}${t("人")})
                ${waitingListInfo}`;
      case "CIVILIAN":
        const getHPBar = (hp: number) => {
          const rate = (hp / MAX) * 100;
          let result = "";
          for (let i = 0; i < 10; i++) {
            if (rate >= (i + 1) * 10) {
              result += "❤️";
            } else {
              result += "🖤";
            }
          }
          return result;
        };
        return `${t("市民")}　${object.hp}/${MAX}
                ${t("残りHP")}:${getHPBar(object.hp as number)}
              `;
      case "BUILDING":
        const getBrokenessLevel = (object: LayerEntity) => {
          const brokenness = object.brokenness;
          if (typeof brokenness === "undefined") {
            return 0;
          }
          switch (true) {
            case brokenness >= 80:
              return 1;
            case brokenness >= 60:
              return 2;
            case brokenness >= 40:
              return 3;
            case brokenness >= 20:
              return 4;
            default:
              return 5;
          }
        };
        const brokenLevel = getBrokenessLevel(object);
        return `${t("建物")}
                ${t("倒壊度")}: ${"🏚️".repeat(brokenLevel)} ${t(
          "レベル"
        )}${brokenLevel}
                `;
      default:
        return `${object.type} (${object.id})\n Position: ${object.x}, ${object.y}`;
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
          onResetAction={resetViewState}
          onZoomInAction={zoomInViewState}
          onZoomOutAction={zoomOutViewState}
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
