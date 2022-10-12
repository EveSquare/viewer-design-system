import { OrthographicView, OrbitView, COORDINATE_SYSTEM } from "@deck.gl/core";
import DeckGL, {
  GeoJsonLayer,
  ArcLayer,
  PolygonLayer,
  IconLayer,
} from "deck.gl";

import normalizePosition from "../../lib/normalizePosition";

class AgentsLayer {
  constructor(mapdata) {
    this.mapdata = mapdata;
    this.AGENT_COLOR = {
      TacticsPolice: [0, 0, 255],
      TacticsFire: [255, 0, 0],
      TacticsAmbulance: [255, 255, 255],
      Civilian: [0, 255, 0],
    };
    this.ICON_MAPPING = {
      marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
    };
  }

  get(rescuelog) {
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
      iconAtlas:
        "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
      iconMapping: this.ICON_MAPPING,
      getIcon: (d) => "marker",
      sizeScale: 15,
      getPosition: (d) => d.coordinates,
      getSize: (d) => 1,
      getColor: (d) => d.color,
      transitions: {
        getPosition: 300,
      },
    });
  }
}
export default AgentsLayer;
