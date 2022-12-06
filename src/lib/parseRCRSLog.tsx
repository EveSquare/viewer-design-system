import { URN_MAP } from "./RCRSURN";
import { Simulation } from "./RCRS";
import { LogProto } from "@/lib/proto/RCRSLogProto_pb";

export const parseRCRSLog = () => {


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
