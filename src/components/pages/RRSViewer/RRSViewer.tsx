import React, { useEffect, useState } from "react";

import DeckGL from "@deck.gl/react";
import { DeckGLWrapper } from "@/components/atoms/DeckGLWrapper";
import { OrbitView } from "@deck.gl/core";

import { Simulation } from "@/lib/RCRS";
import { MAX, STEP_DULATION } from "@/common/viewer/const";
import { LayerEntity, ToolTipObject } from "@/common/viewer/type";

import DefaultAgentsLayer from "@/RRSLayers/Agents/DefaultAgentsLayer";
import DefaultBuildingsLayer from "@/RRSLayers/Buildings/DefaultBuildingsLayer";
import DefaultRoadsLayer from "@/RRSLayers/Roads/DefaultRoadsLayer";
import DefaultBlockadesLayer from "@/RRSLayers/Blockades/DefaultBlockadesLayer";

type Props = {
  simulation: Simulation;
  time: number;
  step: number;
  translation: any;
  filter: object;
  enabledLayers: boolean[];
};

const RRSViewer = ({ ...props }: Props) => {
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

  const [buildingsLayer, setBuildingsLayer] = useState(
    new DefaultBuildingsLayer()
  );
  const [roadsLayer, setRoadsLayer] = useState(new DefaultRoadsLayer());
  const [agentsLayer, setAgentsLayer] = useState(new DefaultAgentsLayer());
  const [blockadesLayer, setBlockadesLayer] = useState(
    new DefaultBlockadesLayer()
  );

  const resetViewState = () => {
    setViewState({
      ...viewState,
      target: [0, 0, 0],
      rotationX: 30,
      rotationOrbit: 0,
      zoom: 0.5,
    });
  };

  useEffect(() => {
    if (props.time % (STEP_DULATION / 10) === 0) {
      (async () => {
        let layer = [];
        if (props.enabledLayers[0]) {
          layer.push(
            await agentsLayer.getLayer(props.step, props.time, props.simulation, props.filter)
          );
        }
        if (props.enabledLayers[1]) {
          layer.push(
            await buildingsLayer.getLayer(props.step, props.simulation)
          );
        }
        if (props.enabledLayers[2]) {
          layer.push(await roadsLayer.getLayer(props.step, props.simulation));
        }
        if (props.enabledLayers[3]) {
          layer.push(
            await blockadesLayer.getLayer(props.step, props.simulation)
          );
        }
        setLayers(layer);
      })();
    }
  }, [props.time]);

  return (
    <>
      <DeckGLWrapper
        onResetAction={() => {
          resetViewState();
        }}
      >
        <DeckGL
          controller={true}
          layers={layers}
          getTooltip={({ object }: ToolTipObject) =>
            getToolTip(object, props.translation)
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
    </>
  );
};

/*
 * Get ToolTip
 * ツールチップを表示する
 */
const getToolTip = (object: LayerEntity, translation: any) => {
  const t = translation;

  if (!object) return;

  switch (object.type) {
    case "REFUGE":
      const bedCapacity = Array(object.bedCapacity).fill("🛏️");
      const occupiedBeds = Array(object.occupiedBeds).fill("🛌");
      const waitingListSize = Array(object.waitingListSize).fill("👥");
      // const refillCapacity = Array(object.refillCapacity).fill("🚰");

      const bedInfo = Object.assign(bedCapacity, occupiedBeds).join(" | ");
      const waitingListInfo = waitingListSize.join(" | ");

      return `${t("ベッド空き状況")}(${occupiedBeds.length}/${
        bedCapacity.length
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
};

export default RRSViewer;
