import { AreaInfo, MapInfo, Record } from "@/common/viewer/type";
import { FillColor } from "@/common/viewer/type";
import { FILL_COLOR } from "@/common/viewer/const";
import { COORDINATE_SYSTEM } from "@deck.gl/core";
import { PolygonLayer } from "@deck.gl/layers";

import normalizePosition from "../../lib/normalizePosition";
import { Simulation, Entity } from "@/lib/RCRS";

class BuildingsLayer {
  layer: object | null;
  currentStep: number;
  prevStep: number;
  mapdata: MapInfo;
  simulation: Simulation;
  FILL_COLOR: FillColor;

  constructor(mapdata: MapInfo, rescuelog: Simulation) {
    this.currentStep = 0;
    this.prevStep = 0;
    this.layer = null;
    this.simulation = rescuelog;
    this.mapdata = mapdata;
    this.FILL_COLOR = FILL_COLOR;
  }

  setSimulation(simulation: Simulation) {
    this.simulation = simulation;
  }

  getLayer(step: number) {
    this.currentStep = step;
    if (this.layer === null || step !== this.prevStep) {
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
            color: this.getColor(v),
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

      this.prevStep = step;
    }

    return this.layer;
  }

  getColor(entity: AreaInfo) {
    if (entity.type === "Building") {
      const entityDetail: Entity | undefined = this.simulation.getWorld(this.currentStep).entities.find((v) => {
        return v.id === entity.id;
      });
      // TODO
      // switch (true) {
      //   case (entityDetail?.broken || 0) >= 80:
      //     return BROKEN.LEVEL_1;
      //   case (entityDetail?.broken || 0) >= 60:
      //     return BROKEN.LEVEL_2;
      //   case (entityDetail?.broken || 0) >= 40:
      //     return BROKEN.LEVEL_3;
      //   case (entityDetail?.broken || 0) >= 20:
      //     return BROKEN.LEVEL_4;
      //   case (entityDetail?.broken || 0) < 20:
      //     return BROKEN.LEVEL_5;
      // }
    }
    return this.FILL_COLOR[entity.type];
  }
}
export default BuildingsLayer;
