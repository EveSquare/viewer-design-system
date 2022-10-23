import protobuf from "protobufjs";
import { URN_MAP } from "./RCRSURN";
import { Simulation } from "./RCRS";

const read_int32 = (byte_array: Uint8Array) => {
  return (
    (byte_array[0] << 24) +
    (byte_array[1] << 16) +
    (byte_array[2] << 8) +
    byte_array[3]
  );
};

export const parseRCRSLog = (log: any) => {

  const sim = new Simulation();

  protobuf.load(
    [
      "/Resources/logs/proto/RCRSLogProto.proto",
      "/Resources/logs/proto/RCRSProto.proto",
    ],
    (err, root) => {
      if (typeof root === "undefined") {
        return;
      }
      const Message = root.lookupType("LogProto");

      let r = new Uint8Array(log);

      while (r.length > 0) {
        const s = read_int32(r);
        const c = r.slice(4, 4 + s);

        const m = Message.decode(c);

        console.log(m.toJSON());

        // TODO: このままだとステップごとの差分データになっているので、fulllogにする
        if (typeof m.toJSON().initialCondition !== "undefined") {
          m.toJSON().initialCondition.entities.forEach((el: any) => {
            const test = el.properties.map((v: any) => {
              return { ...v, urn_name: URN_MAP[v.urn] };
            });
            console.log(el.entityID, URN_MAP[el.urn], test);
          });
        }

        r = r.slice(4 + s);
      }
    }
  );
};
