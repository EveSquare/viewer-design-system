import { AreaInfo, Entity, MapInfo, Record } from "@/common/viewer/type";
import { FillColor } from "@/common/viewer/type";
import { BROKEN, FILL_COLOR } from "@/common/viewer/const";
import { COORDINATE_SYSTEM } from "@deck.gl/core";
import { PolygonLayer } from "@deck.gl/layers";
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';
import { OBJLoader } from '@loaders.gl/obj';

import normalizePosition from "../../lib/normalizePosition";

class MeshBuildingsLayer {
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
            position: [np.getX(v.x), np.getY(v.y)],
            angle: 0,
            color: [255, 0, 0]
          };
        });

      this.layer = new SimpleMeshLayer({
        id: "building",
        data: buildings,
        mesh: '/Resources/models/building.obj',
        loaders: [OBJLoader],
        texture: '/Resources/models/wall_2.jpg',
        // pickable: true,
        getScale: [2, 2, 2],
        getOrientation: (d: any) => [0, 180, 0],
      });

      this.prevStep = this.rescuelog.time;
    }

    return this.layer;
  }

  getColor(entity: AreaInfo) {
    if (entity.type === "Building") {
      const entityDetail: Entity | undefined = this.rescuelog.world.buildings.find((v) => v.id === entity.id);
      switch (true) {
        case (entityDetail?.broken || 0) >= 80:
          return BROKEN.LEVEL_1;
        case (entityDetail?.broken || 0) >= 60:
          return BROKEN.LEVEL_2;
        case (entityDetail?.broken || 0) >= 40:
          return BROKEN.LEVEL_3;
        case (entityDetail?.broken || 0) >= 20:
          return BROKEN.LEVEL_4;
        case (entityDetail?.broken || 0) < 20:
          return BROKEN.LEVEL_5;
      }
    }
    return this.FILL_COLOR[entity.type];
  }
}
export default MeshBuildingsLayer;
