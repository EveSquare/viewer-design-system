// @ts-nocheck
import { load } from "protobufjs";
import "@/lib/proto/RCRSLogProto_pb.js";

const parseRCRSLog = (binLog: any) => {
  load("Resources/proto/RCRSLogProto.proto", (err: any, root: any) => {
    if (err) throw err;
    const decorded_log = proto.LogProto.deserializeBinary(binLog);
    parse(decorded_log);
  });
};

function parse(log: any) {
  switch (log.getLogCase()) {
    case proto.LogProto.LogCase.START:
      console.log("Start Record is Find");
      break;
    case proto.LogProto.LogCase.COMMAND:
      processCommand(log.getCommand());
      console.log("Command Record is Find");
      break;
    case proto.LogProto.LogCase.CONFIG:
      processConfig(log.getConfig());
      console.log("Config Record is Find");
      break;
    case proto.LogProto.LogCase.INITIALCONDITION:
      processInitCondition(log);
      console.log("Initialcondition Record is Find");
      break;
    case proto.LogProto.LogCase.UPDATE:
      processUpdate(log.getUpdate());
      console.log("Update Record is Find");
      break;
    case proto.LogProto.LogCase.PERCEPTION:
      processPerception(log.getPerception());
      console.log("Perception Record is Find");
      break;
    case proto.LogProto.LogCase.END:
      console.log("End Record is Find");
      break;
  }
  console.log(decorded_log);
};

function processConfig(configlog) {
  let config = configlog.getConfig().getDataMap().map_;
  let keys = Object.keys(config);
  // get a specific value: 
  timesteps = config['kernel.timesteps'].value
}

function processCommand(command) {
  let time = command.getTime();
  command.getCommandsList().forEach(c => {
    urn = c.getUrn();
    components = c.getComponentsMap().map_;
    componentKeys = Object.keys(components);
  });
}

function processInitCondition(log) {
  let entities = log.getInitialcondition().getEntitiesList()
  entities.forEach(e => processEntity(e));
}

function processEntity(e) {
  let entityId = e.getEntityid();
  let urn = e.getUrn();
  let properties = e.getPropertiesList();
  properties.forEach(p => processProperty(p));
}

function processProperty(p) {
  let urn = p.getUrn();
  let isDefined = p.getDefined();
  let value = null;
  switch (p.getValueCase()) {
    case proto.PropertyProto.ValueCase.BOOLVALUE:
      value = p.getBoolvalue();
      break;
    case proto.PropertyProto.ValueCase.BYTELIST:
      value = p.getBytelist();
      break;
    case proto.PropertyProto.ValueCase.DOUBLEVALUE:
      value = p.getDoublevalue();
      break;
    case proto.PropertyProto.ValueCase.EDGELIST:
      value = p.getEdgelist().getEdgesList();
      // Example Usage
      //edges.forEach(e=>{
      // 	  let startX=e.getStartx();
      //       let startY=e.getStarty();
      //       let endX=e.getEndx();
      //       let endY=e.getEndy();
      //       let neighbour=e.getNeighbour();
      //});
      break;
    case proto.PropertyProto.ValueCase.INTLIST:
      value = p.getIntlist();
      break;
    case proto.PropertyProto.ValueCase.INTMATRIX:
      value = p.getIntmatrix();
      break;
    case proto.PropertyProto.ValueCase.INTVALUE:
      value = p.getIntvalue();
      break;
    case proto.PropertyProto.ValueCase.POINT2D:
      value = p.getPoint2d();
      // Example Usage
      //let x=  value.getX();
      //let y=  value.getY();
      break;
  }
  return urn, value;
}

function processPerception(perception) {
  let entityId = perception.getEntityid()
  let Communications = perception.getCommunicationsList()
  let time = perception.getTime()
  let changeset = perception.getVisible()
}

function processUpdate(update) {
  // update = log.getUpdate()
  time = update.getTime()
  changeset = update.getChanges()
}

function processChangeSet(changeset) {
  deletedIds = changeset.getDeletesList()
  changes = changeset.getChangesList()
  // for c in changes:
  c.getEntityid()
  c.getUrn()
  c.getPropertiesList()
}

export default parseRCRSLog;