import { IconLayer } from "@deck.gl/layers";

import { AGENT_COLOR, ICON_MAPPING } from "@/common/viewer/const";
import { AgentColor, IconMapping, Point } from "@/common/viewer/type";
import { MapInfo, Record } from "@/common/viewer/type";
import normalizePosition from "@/lib/normalizePosition";
import { Entity, Simulation, WorldModel } from "@/lib/RCRS";
import { URN_MAP } from "@/lib/RCRSURN";
import { BreadcrumbLinkProps } from "@chakra-ui/react";

class AgentsLayer {
  layer: object | null;
  prevStep: number;
  currentStep: number;
  prevPos: Point[];
  AGENT_COLOR: AgentColor;
  ICON_MAPPING: IconMapping;

  constructor() {
    this.layer = null;
    this.prevStep = 0;
    this.currentStep = 0;
    this.prevPos = [];
    this.AGENT_COLOR = AGENT_COLOR;
    this.ICON_MAPPING = ICON_MAPPING;
  }

  getLayer(step: number, time: number, simulation: Simulation, filter: any) {
    return new Promise((resolve, reject) => {
      (async () => {
        this.currentStep = step;
        const world = await simulation.getWorld(step);

        if (world !== null) {
          const np = new normalizePosition(0, 0); //TODO

          const type = filter.agents.type;
          let urnList: any[] = [];
          if (type.ambulance) {
            urnList.push(URN_MAP["AMBULANCE_TEAM"]);
          }
          if (type.police) {
            urnList.push(URN_MAP["POLICE_FORCE"]);
          }
          if (type.fire) {
            urnList.push(URN_MAP["FIRE_BRIGADE"]);
          }
          if (type.civilian) {
            urnList.push(URN_MAP["CIVILIAN"]);
          }

          const entities = world.entities;

          const milliStep = (time / 6) % 10;
          const agents = entities
            .filter((entity) => {
              return urnList.includes(entity.urn);
            })
            .filter((entity) => {
              if (filter.agents.id) {
                return entity.id === filter.agents.id;
              } else {
                return true;
              }
            })
            .map((agent) => {
              if (!agent.urn) return;

              let posX = agent.properties[URN_MAP["X"]].value.value;
              let posY = agent.properties[URN_MAP["Y"]].value.value;

              // const hist: number[] =
              //   agent.properties[URN_MAP["POSITION_HISTORY"]].value.value
              //     ?.values;
              // if (!!hist && !!hist[milliStep - 1]) {
              //   const idx = (milliStep - 1) * 2;
              //   posX = hist[idx];
              //   posY = hist[idx + 1];
              // }

              let position = undefined;
              const positionEntity = entities.find((v) => {
                return (
                  v.id === agent.properties[URN_MAP["POSITION"]].value.value
                );
              });
              if (!!positionEntity && !!positionEntity.urn) {
                position = URN_MAP[positionEntity.urn];
              }

              return {
                id: `${agent.id}`,
                type: URN_MAP[agent.urn],
                position: position,
                x: agent.properties[URN_MAP["X"]].value.value,
                y: agent.properties[URN_MAP["Y"]].value.value,
                color: this.getColor(agent),
                coordinates: [
                  np.getX(posX),
                  np.getY(posY),
                  this.getHeight(position),
                ],
                hp: agent.properties[URN_MAP["HP"]].value.value,
              };
            });

          const layer = new IconLayer({
            id: "agents",
            data: agents,
            pickable: true,
            iconAtlas: "/Resources/img/icon-atlas.png",
            iconMapping: this.ICON_MAPPING,
            getIcon: (d: any) => "marker",
            sizeScale: 15,
            getPosition: (d: any) => d.coordinates,
            getSize: (d: any) => 1,
            getColor: (d: any) => d.color,
            transitions: {
              getPosition: 300,
            },
          });

          this.prevStep = this.currentStep;

          resolve(layer);
        }
      })();
    });
  }

  getHeight(positionEntityType: string) {
    const list = [
      "BUILDING",
      "REFUGE",
      "GAS_STATION",
      "FIRE_STATION",
      "AMBULANCE_CENTRE",
      "POLICE_OFFICE",
    ];

    if (list.includes(positionEntityType)) {
      return 10;
    } else {
      return 2;
    }
  }

  getColor(agent: Entity) {
    if (!agent.urn) return;
    if (agent.urn === URN_MAP["CIVILIAN"]) {
      const civilianHP = agent.properties[URN_MAP["HP"]].value.value || 0;
      switch (true) {
        case civilianHP >= 9333:
          return [0, 255, 0];
        case civilianHP >= 8666:
          return [0, 238, 0];
        case civilianHP >= 7999:
          return [0, 221, 0];
        case civilianHP >= 7332:
          return [0, 204, 0];
        case civilianHP >= 6665:
          return [0, 187, 0];
        case civilianHP >= 5998:
          return [0, 170, 0];
        case civilianHP >= 5331:
          return [0, 153, 0];
        case civilianHP >= 4664:
          return [0, 136, 0];
        case civilianHP >= 3997:
          return [0, 119, 0];
        case civilianHP >= 3330:
          return [0, 102, 0];
        case civilianHP >= 2663:
          return [0, 85, 0];
        case civilianHP >= 1996:
          return [0, 68, 0];
        case civilianHP >= 1329:
          return [0, 51, 0];
        case civilianHP >= 662:
          return [0, 34, 0];
        case civilianHP == 0:
          return [0, 0, 0];
      }
    } else {
      return this.AGENT_COLOR[URN_MAP[agent.urn]];
    }
  }
}
export default AgentsLayer;
