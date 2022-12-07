import { IconLayer } from "@deck.gl/layers";

import { AGENT_COLOR, ICON_MAPPING } from "@/common/viewer/const";
import { AgentColor, IconMapping, Point } from "@/common/viewer/type";
import { MapInfo, Record } from "@/common/viewer/type";
import normalizePosition from "@/lib/normalizePosition";
import { Entity, Simulation } from "@/lib/RCRS";
import { URN_MAP } from "@/lib/RCRSURN";

class AgentsLayer {
  mapdata: MapInfo;
  simulation: Simulation;
  AGENT_COLOR: AgentColor;
  ICON_MAPPING: IconMapping;
  prevPos: Point[];

  constructor(mapdata: MapInfo, simulation: Simulation) {
    this.simulation = simulation;
    this.mapdata = mapdata;
    this.AGENT_COLOR = AGENT_COLOR;
    this.ICON_MAPPING = ICON_MAPPING;
    this.prevPos = [];
  }

  setSimulation(simulation: Simulation) {
    this.simulation = simulation;
  }

  getLayer(step: number, time: number) {
    const np = new normalizePosition(this.mapdata.width, this.mapdata.height);

    const urnList = [
      URN_MAP["CIVILIAN"],
      URN_MAP["FIRE_BRIGADE"],
      URN_MAP["AMBULANCE_TEAM"],
      URN_MAP["POLICE_FORCE"],
    ];
    const agents = this.simulation
      .getWorld(step)
      .entities.filter((entity) => {
        return urnList.includes(entity.urn);
      })
      .map((agent) => {
        if (!agent.urn) return;

        const posX = agent.properties[URN_MAP["X"]].value.value;
        const posY = agent.properties[URN_MAP["Y"]].value.value;

        return {
          id: `${agent.id}`,
          type: URN_MAP[agent.urn],
          x: agent.properties[URN_MAP["X"]].value.value,
          y: agent.properties[URN_MAP["Y"]].value.value,
          color: this.getColor(agent),
          coordinates: [np.getX(posX), np.getY(posY), 10],
        };
      });

    // const agents = this.rescuelog.world.agents.map((v, i) => {
    //   const milliStep = (time / 6) % 10;
    //   v.history?.shift(); // よくわからんけど、配列の最初の値がおかしいので削除する

    //   let pos: Point = { x: v.x || 0, y: v.y || 0 };
    //   if (typeof this.prevPos[i] === "undefined" || this.prevPos[i].x !== pos.x) {
    //     //TODO: Refactoring
    //     let historyIdx = 0;
    //     if (typeof v.history !== "undefined") {
    //       const l = v.history?.length;
    //       historyIdx = milliStep < l ? milliStep : l;
    //     }

    //     if (
    //       typeof v.history !== "undefined" &&
    //       typeof v.history[historyIdx] !== "undefined"
    //     ) {
    //       pos.x = v.history[historyIdx].x;
    //       pos.y = v.history[historyIdx].y;
    //     }

    //   }

    //   this.prevPos[i] = pos;
    //   return {
    //     id: v.id,
    //     type: v.type,
    //     x: v.x,
    //     y: v.y,
    //     color: this.AGENT_COLOR[v.type],
    //     coordinates: [np.getX(pos.x), np.getY(pos.y), 10],
    //   };
    // });

    return new IconLayer({
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
