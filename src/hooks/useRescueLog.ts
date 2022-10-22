import { useEffect, useState } from "react";
import protobuf from "protobufjs";

function useRescueLog(log: any) {
  const host = process.env.NEXT_PUBLIC_LOG_HOST;
  const fetchUrl = new URL(
    `/Resources/logs/sample-logs-protobuf/1/rescue.log`, // TODO: ローカルでunxzコマンドをつかって解凍したログを使用しているが、rescue.log.xzをそのままアップロードできるようにする
    host
  ).href;

  const [rescuelog, setRescuelog] = useState(log);

  const read_int32 = (byte_array: Uint8Array) => {
    return (
      (byte_array[0] << 24) +
      (byte_array[1] << 16) +
      (byte_array[2] << 8) +
      byte_array[3]
    );
  };

  useEffect(() => {
    const ajax = new XMLHttpRequest();
    ajax.open("GET", fetchUrl, true);
    ajax.responseType = "arraybuffer";
    ajax.onload = () => {
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

          let r = new Uint8Array(ajax.response);
          let i = 0;

          while (r.length > 0) {
            const s = read_int32(r);
            const c = r.slice(4, 4 + s);

            const m = Message.decode(c);

            console.log(m.toJSON());

            // TODO: このままだとステップごとの差分データになっているので、fulllogにする
            if (typeof m.toJSON().initialCondition !== "undefined") {
              console.log(m.toJSON().initialCondition.entities);
            }

            r = r.slice(4 + s);
          }
        }
      );
    };
    ajax.send();
  }, []);

  return { rescuelog: rescuelog, setRescuelog: setRescuelog };
}

export default useRescueLog;
