import { OrthographicView, OrbitView, COORDINATE_SYSTEM } from "@deck.gl/core";
import DeckGL, {
  GeoJsonLayer,
  ArcLayer,
  PolygonLayer,
  IconLayer,
} from "deck.gl";

import normalizePosition from "../../lib/normalizePosition";

class RoadsLayer {
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
      getPolygon: (d) => d.contour,
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
