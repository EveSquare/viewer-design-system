import { IconLayer } from "@deck.gl/layers";

import { AGENT_COLOR, ICON_MAPPING } from "../../common/viewer/const";
import { AgentColor, IconMapping } from "../../common/viewer/type";
import { MapInfo, Record } from "../../common/viewer/type";
import normalizePosition from "../../lib/normalizePosition";

class AgentsLayer {
  mapdata: MapInfo;
  AGENT_COLOR: AgentColor;
  ICON_MAPPING: IconMapping;

  constructor(mapdata: MapInfo) {
    this.mapdata = mapdata;
    this.AGENT_COLOR = AGENT_COLOR;
    this.ICON_MAPPING = ICON_MAPPING;
  }

  get(rescuelog: Record) {
    const np = new normalizePosition(this.mapdata.width, this.mapdata.height);

    const agents = rescuelog.world.agents.map((v) => {
      return {
        id: v.id,
        type: v.type,
        x: v.x,
        y: v.y,
        color: this.AGENT_COLOR[v.type],
        coordinates: [np.getX(v.x), np.getY(v.y), 10],
      };
    });

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
}
export default AgentsLayer;
