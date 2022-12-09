import { LayerEntity, MapInfo } from "@/common/viewer/type";
import { FillColor } from "@/common/viewer/type";
import { BROKEN, FILL_COLOR } from "@/common/viewer/const";
import { COORDINATE_SYSTEM } from "@deck.gl/core";
import { PolygonLayer } from "@deck.gl/layers";

import normalizePosition from "@/lib/normalizePosition";
import { Simulation, Entity } from "@/lib/RCRS";
import { URN_MAP } from "@/lib/RCRSURN";
import { EdgeProto } from "@/lib/proto/RCRSProto_pb";

class BuildingsLayer {
  layer: object | null;
  currentStep: number;
  prevStep: number;
  mapdata: MapInfo;
  FILL_COLOR: FillColor;

  constructor(mapdata: MapInfo) {
    this.currentStep = 0;
    this.prevStep = 0;
    this.layer = null;
    this.mapdata = mapdata;
    this.FILL_COLOR = FILL_COLOR;
  }

  getLayer(step: number, simulation: Simulation) {
    this.currentStep = step;

    if (this.layer === null || this.currentStep !== this.prevStep) {
      console.time("Buildings");
      const np = new normalizePosition(this.mapdata.width, this.mapdata.height);

      const buildingURN = [
        URN_MAP["BUILDING"],
        URN_MAP["REFUGE"],
        URN_MAP["GAS_STATION"],
        URN_MAP["FIRE_STATION"],
        URN_MAP["AMBULANCE_CENTRE"],
        URN_MAP["POLICE_OFFICE"],
      ];
      const entities = simulation.getWorld(this.currentStep).entities;

      const buildings = entities
        .filter((entity) => {
          return entity.urn !== null && buildingURN.includes(entity.urn);
        })
        .map((buildingEntity) => {
          let edgesProps = buildingEntity.properties[URN_MAP["EDGES"]];
          let contour = [];
          if (edgesProps.isDefined) {
            contour = edgesProps.value.value.edges.map((vv: EdgeProto) => {
              return [np.getX(vv.startX), np.getY(vv.startY), 0];
            });
            contour.push([
              np.getX(edgesProps.value.value.edges[0].startX),
              np.getY(edgesProps.value.value.edges[0].startY),
              0,
            ]); // push first vertex

            if (!buildingEntity.urn || !buildingEntity.id) {
              return;
            }

            const buildingObject: LayerEntity = {
              type: URN_MAP[buildingEntity.urn],
              id: buildingEntity.id,
              x: this.getValue(buildingEntity, "X"),
              y: this.getValue(buildingEntity, "Y"),
              contour: contour,
              color: this.getColor(buildingEntity),
              elevation: Math.floor((buildingEntity.id % 10) * 0.6) + 3,
              brokenness: this.getValue(buildingEntity, "BROKENNESS"),
            }

            if (buildingEntity.urn === URN_MAP["REFUGE"]) {
              buildingObject.floors = this.getValue(buildingEntity, "FLOORS");
              buildingObject.capacity = this.getValue(buildingEntity, "CAPACITY");
              buildingObject.importance = this.getValue(buildingEntity, "IMPORTANCE");
              buildingObject.capacity = this.getValue(buildingEntity, "CAPACITY");
              buildingObject.bedCapacity = this.getValue(buildingEntity, "BED_CAPACITY");
              buildingObject.occupiedBeds = this.getValue(buildingEntity, "OCCUPIED_BEDS");
              buildingObject.refillCapacity = this.getValue(buildingEntity, "REFILL_CAPACITY");
              buildingObject.waitingListSize = this.getValue(buildingEntity, "WAITING_LIST_SIZE");
            }

            return buildingObject;
          }
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

      this.prevStep = this.currentStep;

      console.timeEnd("Buildings");
    }

    return this.layer;
  }

  getColor(entity: Entity) {
    if (entity.urn === URN_MAP["REFUGE"]) {
      return [0, 255, 0]
    }
    const brokenness = entity.properties[URN_MAP["BROKENNESS"]].value.value;
    if (typeof brokenness === "undefined") {
      return;
    }
    switch (true) {
      case brokenness >= 80:
        return BROKEN.LEVEL_1;
      case brokenness >= 60:
        return BROKEN.LEVEL_2;
      case brokenness >= 40:
        return BROKEN.LEVEL_3;
      case brokenness >= 20:
        return BROKEN.LEVEL_4;
      default:
        return BROKEN.LEVEL_5;
    }
  }

  getValue(layerObject: Entity, urnName: string) {
    return layerObject.properties[URN_MAP[urnName]].value.value;
  }
}
export default BuildingsLayer;
