import { URN_MAP } from "@/lib/RCRSURN";
import { Simulation } from "./../../lib/RCRS";
import { COORDINATE_SYSTEM } from "@deck.gl/core";
import { PolygonLayer } from "@deck.gl/layers";

import normalizePosition from "../../lib/normalizePosition";
import { MapInfo, Record } from "../../common/viewer/type";

class BlockadesLayer {
  layer: object | null;
  prevStep: number;
  currentStep: number;

  constructor() {
    this.prevStep = 0;
    this.currentStep = 0;
    this.layer = null;
  }

  getLayer(step: number, simulation: Simulation) {
    return new Promise((resolve, reject) => {
      (async () => {
        this.currentStep = step;

        if (this.layer === null || this.prevStep !== this.currentStep) {
          console.time("Blockades");
          const np = new normalizePosition(0, 0); //TODO
          const blockadeURN = URN_MAP["BLOCKADE"];
          const world = await simulation.getWorld(this.currentStep);
          const entities = world.entities;

          const blockades = entities
            .filter((entity) => {
              return entity.urn !== null && entity.urn === blockadeURN;
            })
            .map((blockadeEntity: any) => {
              let d = [];
              const edge: number[] =
                blockadeEntity.properties[URN_MAP["APEXES"]].value.value.values;

              if (edge.length > 0) {
                for (let i = 0; i < edge.length; i += 2) {
                  d.push([np.getX(edge[i]), np.getY(edge[i + 1]), 0]);
                }
                d.push([np.getX(edge[0]), np.getY(edge[1]), 0]); // push first vertex
              }
              return {
                type: URN_MAP[blockadeEntity.urn],
                id: blockadeEntity.id,
                x: blockadeEntity.properties[URN_MAP["X"]].value.value,
                y: blockadeEntity.properties[URN_MAP["X"]].value.value,
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
        resolve(this.layer);
      })();
    });
  }
}
export default BlockadesLayer;
