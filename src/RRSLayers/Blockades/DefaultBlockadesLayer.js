import { OrthographicView, OrbitView, COORDINATE_SYSTEM } from "@deck.gl/core";
import DeckGL, {
  GeoJsonLayer,
  ArcLayer,
  PolygonLayer,
  IconLayer,
} from "deck.gl";

import normalizePosition from "../../lib/normalizePosition";

class BlockadesLayer {
  constructor(mapdata) {
    this.mapdata = mapdata;
  }

  get(rescuelog) {
    const np = new normalizePosition(this.mapdata.width, this.mapdata.height);
    const blockades = rescuelog.world.blockades
      .filter((v) => {
        return v.deleted !== true;
      })
      .map((v) => {
        let d = v.apexes.map((vv) => [np.getX(vv.x), np.getY(vv.y), 0]);
        d.push([np.getX(v.apexes[0].x), np.getY(v.apexes[0].y), 0]); // push first vertex
        return {
          type: v.type,
          id: v.id,
          x: v.x,
          y: v.y,
          contour: d,
          elevation: 1,
        };
      });

    return new PolygonLayer({
      id: "blockades",
      data: blockades,
      extruded: true,
      pickable: true,
      stroked: true,
      filled: true,
      wireframe: true,
      lineWidthMinPixels: 1,
      getPolygon: (d) => d.contour,
      getElevation: (d) => d.elevation,
      getFillColor: [0, 0, 0, 254],
      getLineColor: [80, 80, 80],
      getLineWidth: 1,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      coordinateOrigin: [-122.4004935, 37.7900486, 0],
    });
  }
}
export default BlockadesLayer;
