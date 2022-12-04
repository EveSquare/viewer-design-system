import { LogProto, InitialConditionsLogProto } from "./proto/RCRSLogProto_pb";
import { PropertyProto } from "./proto/RCRSProto_pb";
import { URN_MAP } from "./RCRSURN";

export class Simulation {
  worldmodels: WorldModel[] = [];
  config: any;
  constructor() {}
  getTotalTimeSteps() {
    return Object.keys(this.worldmodels).length - 1;
  }
  getWorld(time: number) {
    if (!this.worldmodels[time]) {
      if (time == 0) this.worldmodels[time] = new WorldModel(0);
      else if (this.worldmodels[time - 1])
        this.worldmodels[time] = this.worldmodels[time - 1].cloneForNextCycle();
      else {
        alert(
          `No information exist for cycle ${time - 1} but requested for ${time}`
        );
      }
    }
    return this.worldmodels[time];
  }

  processCommand(command: any) {
    let time = command.getTime();
    this.getWorld(time).addCommands(command.getCommandsList());
  }

  processConfig(configlog: any) {
    this.config = configlog.getConfig().getDataMap().map_;
    //let keys = Object.keys(config);
    // get a specific value:
    //timesteps = config['kernel.timesteps'].value
  }

  processInitCondition(init: InitialConditionsLogProto) {
    let entities = init.getEntitiesList();
    console.log("T");
    console.log(entities);
    // this.getWorld(0).processEntities(entities);
  }

  processPerception(perception: any) {
    let time = perception.getTime();
    this.getWorld(time).addPerception(perception);
  }
  processUpdate(update: any) {
    let time = update.getTime();
    this.getWorld(time).update(update.getChanges());
  }

  getConfig() {
    return this.config;
  }
}

export class WorldModel {
  time = 0;
  commands: any[] = [];
  changeset = null;
  perceptions: { [key: string]: any } = {};
  entities: Entity[] = [];
  entitiesByUrn: { [key: string]: any } = {};

  constructor(time: number) {
    this.time = time;
  }
  cloneForNextCycle() {
    let newWorld = new WorldModel(this.time + 1);
    Object.keys(this.entities).forEach((eid) => {
      newWorld.entities[Number(eid)] = this.entities[Number(eid)].clone();
    });
    newWorld.refresh();
    return newWorld;
  }
  update(changeset: any) {
    this.changeset = changeset;
    let changes = changeset.getChangesList();
    changes.forEach((c: any) => {
      let entity = this.entities[c.getEntityid()];
      if (!entity) {
        entity = new Entity(c);
        this.entities[entity.id] = entity;
      } else entity.update(c.getPropertiesList());
    });
    let deletedIds = changeset.getDeletesList();
    deletedIds.forEach((id: any) => delete this.entities[id]);
    this.refresh();
  }
  refresh() {
    this.entitiesByUrn = {};
    Object.keys(this.entities).forEach((eid: any) => {
      let e = this.entities[eid];
      if (!this.entitiesByUrn[e.urn]) this.entitiesByUrn[e.urn] = [];
      this.entitiesByUrn[e.urn].push(e);
    });
  }
  addCommands(commandLists: any) {
    commandLists.forEach((c: any) => {
      this.commands.push(c);
      // urn = command.getUrn();
      // components = command.getComponentsMap().map_;
      // componentKeys = Object.keys(components);
    });
  }
  processEntities(entities: any) {
    entities.forEach((entityProto: any) => {
      let e = new Entity(entityProto);
      this.entities[e.id] = e;
    });
    this.refresh();
  }
  addPerception(perception: any) {
    let entityId = perception.getEntityid();
    // let Communications = perception.getCommunicationsList()
    // let changeset = perception.getVisible()
    this.perceptions[entityId] = perception;
  }
}

export class Entity {
  id;
  urn;

  properties: { [key: string]: any } = {};

  constructor(entityProto: any = null) {
    if (!entityProto) return;
    this.id = entityProto.getEntityid();
    this.urn = entityProto.getUrn();
    let props = entityProto.getPropertiesList();
    this.update(props);
  }
  update(props: any) {
    props.forEach((prop: any) => {
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
    return `${URN_MAP[this.urn]}(${this.id})`;
  }
}

export class Property {
  urn;
  isDefined;
  value;
  type;

  constructor(propertyProto: PropertyProto) {
    this.urn = propertyProto.getUrn();
    this.isDefined = propertyProto.getDefined();
    this.value = null;
    this.type = propertyProto.getValueCase();
    switch (propertyProto.getValueCase()) {
      case PropertyProto.ValueCase["BOOLVALUE"]:
        this.value = propertyProto.getBoolvalue();
        break;
      case PropertyProto.ValueCase["BYTELIST"]:
        this.value = propertyProto.getBytelist();
        break;
      case PropertyProto.ValueCase["DOUBLEVALUE"]:
        this.value = propertyProto.getDoublevalue();
        break;
      case PropertyProto.ValueCase["EDGELIST"]:
        this.value = propertyProto.getEdgelist()?.getEdgesList();
        // Example Usage
        //edges.forEach(e=>{
        // 	  let startX=e.getStartx();
        //       let startY=e.getStarty();
        //       let endX=e.getEndx();
        //       let endY=e.getEndy();
        //       let neighbour=e.getNeighbour();
        //});
        break;
      case PropertyProto.ValueCase["INTLIST"]:
        this.value = propertyProto.getIntlist();
        break;
      case PropertyProto.ValueCase["INTMATRIX"]:
        this.value = propertyProto.getIntmatrix();
        break;
      case PropertyProto.ValueCase["INTVALUE"]:
        this.value = propertyProto.getIntvalue();
        break;
      case PropertyProto.ValueCase["POINT2D"]:
        this.value = propertyProto.getPoint2d();
        // Example Usage
        //let x=  value.getX();
        //let y=  value.getY();
        break;
    }
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
