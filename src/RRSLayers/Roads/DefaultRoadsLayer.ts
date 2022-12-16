import { Simulation } from "@/lib/RCRS";
import { AGENT_COLOR, FILL_COLOR, ICON_MAPPING } from "@/common/viewer/const";
import { MapInfo, AgentColor, IconMapping } from "@/common/viewer/type";
import { COORDINATE_SYSTEM } from "@deck.gl/core";
import { PolygonLayer } from "@deck.gl/layers";

import normalizePosition from "@/lib/normalizePosition";
import { URN_MAP } from "@/lib/RCRSURN";
import { EdgeProto } from "@/lib/proto/RCRSProto_pb";

class RoadsLayer {
  layer: object | null;
  prevStep: number;
  currentStep: number;
  mapdata: MapInfo;
  AGENT_COLOR: AgentColor;
  ICON_MAPPING: IconMapping;

  constructor(mapdata: MapInfo) {
    this.prevStep = 0;
    this.currentStep = 0;
    this.layer = null;
    this.mapdata = mapdata;
    this.AGENT_COLOR = AGENT_COLOR;
    this.ICON_MAPPING = ICON_MAPPING;
  }

  getLayer(step: number, simulation: Simulation) {
    return new Promise((resolve, reject) => {
      (async () => {
        this.currentStep = step;

        if (this.layer === null || this.prevStep !== this.currentStep) {
          console.time("Roads");
          const np = new normalizePosition(
            this.mapdata.width,
            this.mapdata.height
          );

          const roadURN = URN_MAP["ROAD"];
          const world = await simulation.getWorld(this.currentStep);
          const entities = world.entities;

          const roads = entities
            .filter((entity) => {
              return entity.urn !== null && entity.urn === roadURN;
            })
            .map((roadEntity) => {
              let edgesProps = roadEntity.properties[URN_MAP["EDGES"]];
              let contour = [];

              if (edgesProps.isDefined) {
                contour = edgesProps.value.value.edges.map((vv: EdgeProto) => {
                  return [np.getX(vv.startX), np.getY(vv.startY), 0];
                });

                contour.push([
                  np.getX(edgesProps.value.value.edges[0].startX),
                  np.getY(edgesProps.value.value.edges[0].startY),
                  0,
                ]);

                if (!roadEntity.urn || !roadEntity.id) {
                  return;
                }

                return {
                  type: URN_MAP[roadEntity.urn],
                  id: roadEntity.id,
                  x: roadEntity.properties[URN_MAP["X"]].value.value,
                  y: roadEntity.properties[URN_MAP["Y"]].value.value,
                  contour: contour,
                };
              }
            });

          this.layer = new PolygonLayer({
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
            getFillColor: FILL_COLOR.Road,
            getLineColor: [80, 80, 80],
            getLineWidth: 1,
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
            coordinateOrigin: [-122.4004935, 37.7900486, 0],
          });

          this.prevStep = this.currentStep;

          console.timeEnd("Roads");
        }
        resolve(this.layer);
      })();
    });
  }
}
export default RoadsLayer;
