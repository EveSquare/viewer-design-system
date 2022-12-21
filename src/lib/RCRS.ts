import { MAX } from "@/common/viewer/const";
import {
  LogProto,
  InitialConditionsLogProto,
  UpdatesLogProto,
  CommandLogProto,
  ConfigLogProto,
  PerceptionLogProto,
} from "./proto/RCRSLogProto_pb";
import {
  ChangeSetProto,
  EdgeListProto,
  EntityListProto,
  EntityProto,
  PropertyProto,
} from "./proto/RCRSProto_pb";
import { URN_MAP } from "./RCRSURN";

export class Simulation {
  worldmodels: WorldModel[] = [];
  config: any;
  constructor() {}

  getTotalTimeSteps() {
    if (typeof this.worldmodels !== "undefined") {
      return this.worldmodels.length - 1;
    }
    return -1;
  }
  getWorld(time: number): Promise<WorldModel> {
    return new Promise((resolve, reject) => {
      (async () => {
        if (!this.worldmodels[time]) {
          // Create New WorldModel
          if (time == 0) {
            this.worldmodels[time] = new WorldModel(0);
          } else if (this.worldmodels[time - 1]) {
            //clone
            const prevStepClone = await this.worldmodels[
              time - 1
            ].cloneForNextCycle();

            if (prevStepClone) {
              this.worldmodels[time] = prevStepClone;
            } else {
              console.error("Clone Faild");
              throw new Error("Clone Faild");
            }
          } else {
            alert(
              `No information exist for cycle ${
                time - 1
              } but requested for ${time}`
            );
          }
        }

        resolve(this.worldmodels[time]);
      })();
    });
  }
  getMultipleStepEntities(startTime: number, count: number): Promise<Entity[][]> {
    return new Promise((resolve, reject) => {
      async () => {
        let worldList = [];
        for (let time = startTime; time < startTime + count; time++) {
          if (this.worldmodels[time]) {
            worldList.push(this.worldmodels[time].entities);
          }
        }
        resolve(worldList);
      };
    });
  }
  getConfig() {
    return this.config;
  }

  getScore(time: number) {
    return this.worldmodels[time].getScore();
  }

  process(binLog: Uint8Array): Promise<void> {
    return new Promise((resolve, reject) => {
      (async () => {
        const decoded_log: LogProto = LogProto.fromBinary(
          new Uint8Array(binLog)
        );

        switch (decoded_log.log.case) {
          case "start":
            console.log("Start Record is Find");
            resolve();
            break;
          case "command":
            console.log("Command Record is Find");
            await this.processCommand(decoded_log.log.value);
            resolve();
            break;
          case "config":
            console.log("Config Record is Find");
            await this.processConfig(decoded_log.log.value);
            resolve();
            break;
          case "initialCondition":
            console.log("Initialcondition Record is Find");
            await this.processInitCondition(decoded_log.log.value);
            resolve();
            break;
          case "update":
            console.log("Update Record is Find");
            await this.processUpdate(decoded_log.log.value);
            resolve();
            break;
          case "perception":
            console.log("Perception Record is Find");
            resolve();
            break;
          case "end":
            console.log("End Record is Find");
            resolve();
            break;
        }
      })();
    });
  }

  processCommand(command: CommandLogProto) {
    return new Promise((resolve, reject) => {
      (async () => {
        let time = command.time;
        const world = await this.getWorld(time);
        if (world) {
          world.addCommands(command.commands);
          resolve(true);
        } else {
          throw new Error("ERR!");
        }
      })();
    });
  }

  async processConfig(configlog: ConfigLogProto) {
    return new Promise((resolve, reject) => {
      this.config = configlog.config?.data;
      //let keys = Object.keys(config);
      // get a specific value:
      //timesteps = config['kernel.timesteps'].value
      resolve(true);
    });
  }

  processInitCondition(init: InitialConditionsLogProto) {
    return new Promise((resolve, reject) => {
      (async () => {
        let entities = init.entities;
        console.log("init entities list size: ", entities.length);
        const world = await this.getWorld(0);
        if (world) {
          world.processEntities(entities);
          resolve(true);
        } else {
          throw new Error("ERR!");
        }
      })();
    });
  }

  processPerception(perception: PerceptionLogProto) {
    return new Promise((resolve, reject) => {
      (async () => {
        let time = perception.time;
        const world = await this.getWorld(time);
        if (world) {
          world.addPerception(perception);
          resolve(true);
        } else {
          throw new Error("ERR!");
        }
      })();
    });
  }

  async processUpdate(update: UpdatesLogProto) {
    return new Promise((resolve, reject) => {
      (async () => {
        const time = update.time;
        const world = await this.getWorld(time);
        if (world && typeof update.changes !== "undefined") {
          world.update(update.changes);
          resolve(true);
        } else {
          throw new Error("ERR!");
        }
      })();
    });
  }
}

export class WorldModel {
  time = 0;
  commands: any[] = [];
  changeset: ChangeSetProto | null = null;
  perceptions: { [key: string]: any } = {};
  entities: Entity[] = [];
  entitiesByUrn: { [key: string]: any } = {};
  isUpdated = false;
  isCommandsSet = false;

  constructor(time: number) {
    this.time = time;
  }
  cloneForNextCycle(): Promise<WorldModel | null> {
    return new Promise((resolve, reject) => {
      let newWorld = new WorldModel(this.time + 1);
      Object.keys(this.entities).forEach((eid) => {
        newWorld.entities[Number(eid)] = this.entities[Number(eid)].clone();
      });
      newWorld.refresh();
      resolve(newWorld);
    });
  }
  update(changeset: ChangeSetProto) {
    this.changeset = changeset;
    let changes = changeset.changes;

    changes.forEach((changedEntity) => {
      const id = changedEntity.entityID;
      //upsert changed entites
      const idx = this.entities.findIndex((e) => {
        return e.id === id;
      });
      if (idx > -1) {
        this.entities[idx].update(changedEntity.properties);
      } else {
        this.entities.push(new Entity(changedEntity));
      }

      //delete deleted entities from entity list
      let deletedIds = changeset.deletes;
      this.entities = this.entities.filter((v) => {
        if (v.id !== null) {
          return !deletedIds.includes(v.id);
        }
      });

      this.isUpdated = true;
    });

    this.refresh();
  }
  refresh() {
    this.entitiesByUrn = {};
    const entitiesWithUrn = this.entities.filter((v) => v.urn !== null);

    this.entitiesByUrn = entitiesWithUrn.reduce((acc: any, cur: any) => {
      acc[cur.urn] = cur;
      return acc;
    }, {});
  }
  addCommands(commandLists: any) {
    commandLists.forEach((c: any) => {
      this.commands.push(c);
      // urn = command.getUrn();
      // components = command.getComponentsMap().map_;
      // componentKeys = Object.keys(components);
    });

    this.isCommandsSet = true;
  }
  processEntities(entities: EntityProto[]) {
    entities.forEach((entities) => {
      let e = new Entity(entities);
      if (e.id !== null) {
        this.entities.push(e);
      }
    });
    this.refresh();
  }
  addPerception(perception: any) {
    let entityId = perception.getEntityid();
    // let Communications = perception.getCommunicationsList()
    // let changeset = perception.getVisible()
    this.perceptions[entityId] = perception;
  }

  getScore() {
    const civilians = this.entities.filter(
      (entity: Entity) =>
        entity.urn !== null && entity.urn === URN_MAP["CIVILIAN"]
    );
    const { totalHP, aliveCivilians } = civilians.reduce(
      (acc: any, cur: Entity) => {
        const hp = cur.properties[URN_MAP["HP"]];
        if (hp?.isDefined) {
          acc.totalHP += hp.value.value;
          if (hp.value.value > 0) {
            acc.aliveCivilians += 1;
          }
        }
        return acc;
      },
      { totalHP: 0, aliveCivilians: 0 }
    );

    return (
      aliveCivilians * Math.exp(-5 * (1 - totalHP / (aliveCivilians * MAX))) ||
      0
    );
  }
}

export class Entity {
  id: number | null = null;
  urn: number | null = null;

  properties: { [key: string]: any } = {};

  constructor(entityProto: EntityProto | null = null) {
    if (!entityProto) return;
    this.id = entityProto.entityID;
    this.urn = entityProto.urn;
    let props = entityProto.properties;
    this.update(props);
  }
  update(props: any) {
    props.forEach((prop: PropertyProto) => {
      let p = new Property(prop);
      this.properties[p.urn] = p;
    });
  }
  clone() {
    let newE = new Entity();
    newE.id = this.id;
    newE.urn = this.urn;
    Object.keys(this.properties).forEach((u) => {
      newE.properties[u] = this.properties[u].clone();
    });
    return newE;
  }
  toString() {
    if (this.urn == null) {
      return;
    }
    return `${URN_MAP[this.urn]}(${this.id})`;
  }
}

export class Property {
  urn;
  isDefined;
  value;
  type;

  constructor(propertyProto: PropertyProto) {
    this.urn = propertyProto.urn;
    this.isDefined = propertyProto.defined;
    this.value = propertyProto.value;
    this.type = propertyProto.value.case;
    // switch (propertyProto.value.case) {
    //   case "boolValue":
    //     this.value = propertyProto.value.value;
    //     break;
    //   case "byteList":
    //     this.value = propertyProto.value.value;
    //     break;
    //   case "boolValue":
    //     this.value = propertyProto.value.value;
    //     break;
    //   case "edgeList":
    //     this.value = propertyProto.value.value;
    //     // Example Usage
    //     //edges.forEach(e=>{
    //     // 	  let startX=e.getStartx();
    //     //       let startY=e.getStarty();
    //     //       let endX=e.getEndx();
    //     //       let endY=e.getEndy();
    //     //       let neighbour=e.getNeighbour();
    //     //});
    //     break;
    //   case PropertyProto.ValueCase["INTLIST"]:
    //     this.value = propertyProto.getIntlist();
    //     break;
    //   case PropertyProto.ValueCase["INTMATRIX"]:
    //     this.value = propertyProto.getIntmatrix();
    //     break;
    //   case PropertyProto.ValueCase["INTVALUE"]:
    //     this.value = propertyProto.getIntvalue();
    //     break;
    //   case PropertyProto.ValueCase["POINT2D"]:
    //     this.value = propertyProto.getPoint2d();
    //     // Example Usage
    //     //let x=  value.getX();
    //     //let y=  value.getY();
    //     break;
    // }
  }
  clone() {
    // not needed to clone with new Entity for saving memory
    return this;
  }
  toString() {
    return (
      URN_MAP[this.urn] + ": " + (this.isDefined ? this.value : "undefined")
    );
  }
}

// proto.MessageProto.prototype.toString = function () {
//   let components = this.getComponentsMap().map_;
//   let res = `${URN.MAP[this.getUrn()]}: `;
//   Object.keys(components).forEach((c) => {
//     res += URN.MAP[c] + "=" + components[c].value.toString() + " ";
//   });
//   return res;
// };

// proto.PerceptionLogProto.prototype.toString = function () {
//   let entityId = this.getEntityid();
//   let communications = this.getCommunicationsList();
//   let time = this.getTime();
//   let changeset = this.getVisible();
//   return `time=${time} entityId=${entityId} changeset=${changeset.toString()} communications=${communications.toString()} `;
// };

// proto.ChangeSetProto.prototype.toString = function () {
//   deletedIds = this.getDeletesList();
//   let res = `deleted=${deletedIds} updated=`;
//   changes = this.getChangesList();
//   changes.forEach((c) => {
//     res += c.getEntityid() + ",";
//     // c.getUrn()
//     // c.getPropertiesList()
//   });
//   return res;
// };
