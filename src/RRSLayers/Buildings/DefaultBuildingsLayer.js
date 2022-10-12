import { OrthographicView, OrbitView, COORDINATE_SYSTEM } from "@deck.gl/core";
import DeckGL, {
  GeoJsonLayer,
  ArcLayer,
  PolygonLayer,
  IconLayer,
} from "deck.gl";

import normalizePosition from "../../lib/normalizePosition";

class BuildingsLayer {
  constructor(mapdata) {
    this.mapdata = mapdata;
    this.FILL_COLOR = {
      Building: [200, 200, 200, 200],
      Refuge: [0, 200, 0, 200],
      GasStation: [200, 200, 200, 200],
    };
  }

  get(rescuelog) {
    const np = new normalizePosition(this.mapdata.width, this.mapdata.height);
    const buildings = this.mapdata.entities
      .filter(
        (v) =>
          v.type === "Building" ||
          v.type === "Refuge" ||
          v.type === "GasStation"
      )
      .map((v) => {
        if (v.type === "Refuge") {
          console.log(v.type, v.x, v.y);
        }

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
          color: this.FILL_COLOR[v.type],
          elevation: v.type === "Refuge" ? 1 : Math.floor((v.id % 10) * 0.6) + 3,
        };
      });

    return new PolygonLayer({
      id: "building",
      data: buildings,
      extruded: true,
      pickable: true,
      stroked: true,
      filled: true,
      wireframe: true,
      lineWidthMinPixels: 1,
      getPolygon: (d) => d.contour,
      getElevation: (d) => d.elevation,
      getFillColor: (d) => d.color,
      getLineColor: [80, 80, 80],
      getLineWidth: 1,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      coordinateOrigin: [-122.4004935, 37.7900486, 0],
    });
  }
}
export default BuildingsLayer;
