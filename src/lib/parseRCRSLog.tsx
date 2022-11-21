//@ts-nocheck
import { URN_MAP } from "./RCRSURN";
import { Simulation } from "./RCRS";
import "@/lib/proto/RCRSLogProto_pb.js";

const parse = (log: any) => {
  switch (log.getLogCase()) {
    case proto.LogProto.LogCase.START:
      console.log("Start Record is Find");
      break;
    case proto.LogProto.LogCase.COMMAND:
      // processCommand(log.getCommand());
      console.log("Command Record is Find");
      break;
    case proto.LogProto.LogCase.CONFIG:
      // processConfig(log.getConfig());
      console.log("Config Record is Find");
      break;
    case proto.LogProto.LogCase.INITIALCONDITION:
      // processInitCondition(log.getInitialcondition());
      console.log("Initialcondition Record is Find");
      break;
    case proto.LogProto.LogCase.UPDATE:
      // processUpdate(log.getUpdate());
      console.log("Update Record is Find");
      break;
    case proto.LogProto.LogCase.PERCEPTION:
      // processPerception(log.getPerception());
      console.log("Perception Record is Find");
      break;
    case proto.LogProto.LogCase.END:
      console.log("End Record is Find");
      break;
  }
};

export const parseRCRSLog = (binLog: any) => {

  // const sim = new Simulation();

  const decoded_log = proto.LogProto.deserializeBinary(binLog);
  parse(decoded_log);
  // // TODO: このままだとステップごとの差分データになっているので、fulllogにする
  // if (typeof m.toJSON().initialCondition !== "undefined") {
  //   m.toJSON().initialCondition.entities.forEach((el: any) => {
  //     const test = el.properties.map((v: any) => {
  //       return { ...v, urn_name: URN_MAP[v.urn] };
  //     });
  //     console.log(el.entityID, URN_MAP[el.urn], test);
  //   });
  // }
};
