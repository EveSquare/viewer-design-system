import { AGENT_COLOR, ICON_MAPPING } from "@/common/viewer/const";
import { MapInfo, AgentColor, IconMapping, Record } from "@/common/viewer/type";
import { COORDINATE_SYSTEM } from "@deck.gl/core";
import { PolygonLayer } from "@deck.gl/layers";

import normalizePosition from "../../lib/normalizePosition";

class RoadsLayer {
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

    const roads = this.mapdata.entities
      .filter((v) => v.type === "Road" || "Hydrant")
      .map((v) => {
        let d = v.edges.map((vv) => [
          np.getX(vv.start.x),
          np.getY(vv.start.y),
          0,
        ]);
        d.push([np.getX(v.edges[0].start.x), np.getY(v.edges[0].start.y), 0]); // push first vertex
        return {
          type: v.type,
          id: v.id,
          x: v.x,
          y: v.y,
          contour: d,
        };
      });

    return new PolygonLayer({
      id: "road",
      data: roads,
      extruded: true,
      pickable: true,
      stroked: true,
      filled: true,
      wireframe: true,
      lineWidthMinPixels: 1,
      getPolygon: (d: any) => d.contour,
      getElevation: 0,
      getFillColor: [230, 230, 230],
      getLineColor: [80, 80, 80],
      getLineWidth: 1,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      coordinateOrigin: [-122.4004935, 37.7900486, 0],
    });
  }
}
export default RoadsLayer;
