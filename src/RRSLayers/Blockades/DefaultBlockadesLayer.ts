import { URN_MAP } from '@/lib/RCRSURN';
import { Simulation } from './../../lib/RCRS';
import { COORDINATE_SYSTEM } from "@deck.gl/core";
import { PolygonLayer } from "@deck.gl/layers";

import normalizePosition from "../../lib/normalizePosition";
import { MapInfo, Record } from "../../common/viewer/type";

class BlockadesLayer {
  layer: object | null;
  prevStep: number;
  currentStep: number;
  mapdata: MapInfo;

  constructor(mapdata: MapInfo) {
    this.prevStep = 0;
    this.currentStep = 0;
    this.layer = null;
    this.mapdata = mapdata;
  }

  getLayer(step: number, simulation: Simulation) {
    this.currentStep = step;

    if (this.layer === null || this.prevStep !== this.currentStep) {
      console.time("Blockades");
      const np = new normalizePosition(this.mapdata.width, this.mapdata.height);

      const blockadeURN = URN_MAP["BLOCKADE"];
      const entities = simulation.getWorld(this.currentStep).entities;

      const blockades = entities
        .filter((entity) => {
          return entity.urn !== null && entity.urn === blockadeURN;
        })
        .map((v: any) => {
          //
          let coutour = [];
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

      this.layer = new PolygonLayer({
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
      this.prevStep = this.currentStep;

      console.timeEnd("Blockades");
    }

    return this.layer;
  }
}
export default BlockadesLayer;
