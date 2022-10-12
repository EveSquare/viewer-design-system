import { COORDINATE_SYSTEM } from "@deck.gl/core";
import { PolygonLayer } from "@deck.gl/layers";

import normalizePosition from "../../lib/normalizePosition";
import { MapInfo, Record } from "../../common/viewer/type";

class BlockadesLayer {
  mapdata: MapInfo;

  constructor(mapdata: MapInfo) {
    this.mapdata = mapdata;
  }

  get(rescuelog: Record) {
    const np = new normalizePosition(this.mapdata.width, this.mapdata.height);
    const blockades = rescuelog.world.blockades
      .filter((v: any) => {
        return v.deleted !== true;
      })
      .map((v: any) => {
        let d = v.apexes.map((vv: any) => [np.getX(vv.x), np.getY(vv.y), 0]);
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
      getPolygon: (d: any) => d.contour,
      getElevation: (d: any) => d.elevation,
      getFillColor: [0, 0, 0, 254],
      getLineColor: [80, 80, 80],
      getLineWidth: 1,
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      coordinateOrigin: [-122.4004935, 37.7900486, 0],
    });
  }
}
export default BlockadesLayer;
