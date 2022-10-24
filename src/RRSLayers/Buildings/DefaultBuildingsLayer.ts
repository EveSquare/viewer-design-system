import { AreaInfo, MapInfo, Record } from "@/common/viewer/type";
import { FillColor } from "@/common/viewer/type";
import { FILL_COLOR } from "@/common/viewer/const";
import { COORDINATE_SYSTEM } from "@deck.gl/core";
import { PolygonLayer } from "@deck.gl/layers";

import normalizePosition from "../../lib/normalizePosition";

class BuildingsLayer {
  layer: object | null;
  prevStep: number;
  mapdata: MapInfo;
  rescuelog: Record;
  FILL_COLOR: FillColor;

  constructor(mapdata: MapInfo, rescuelog: Record) {
    this.prevStep = 0;
    this.layer = null;
    this.rescuelog = rescuelog;
    this.mapdata = mapdata;
    this.FILL_COLOR = FILL_COLOR;
  }

  setRescueLog(rescuelog: Record) {
    this.rescuelog = rescuelog;
  }

  getLayer() {
    const currentStep = this.rescuelog.time;

    if (this.layer === null || this.prevStep !== currentStep) {
      const np = new normalizePosition(this.mapdata.width, this.mapdata.height);
      const buildings = this.mapdata.entities
        .filter(
          (v: any) =>
            v.type === "Building" ||
            v.type === "Refuge" ||
            v.type === "GasStation"
        )
        .map((v: AreaInfo) => {
          let d = v.edges.map((vv: any) => [
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
            elevation:
              v.type === "Refuge" ? 1 : Math.floor((v.id % 10) * 0.6) + 3,
          };
        });

      this.layer = new PolygonLayer({
        id: "building",
        data: buildings,
        extruded: true,
        pickable: true,
        stroked: true,
        filled: true,
        wireframe: true,
        lineWidthMinPixels: 1,
        getPolygon: (d: any) => d.contour,
        getElevation: (d: any) => d.elevation,
        getFillColor: (d: any) => d.color,
        getLineColor: [80, 80, 80],
        getLineWidth: 1,
        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        coordinateOrigin: [-122.4004935, 37.7900486, 0],
      });

      this.prevStep = this.rescuelog.time;
    }

    return this.layer;
  }
}
export default BuildingsLayer;
