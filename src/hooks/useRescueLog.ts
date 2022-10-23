import { useEffect, useState } from "react";
import { parseRCRSLog } from "@/lib/parseRCRSLog";

function useRescueLog(log: any) {
  const host = process.env.NEXT_PUBLIC_LOG_HOST;
  const fetchUrl = new URL(
    `/Resources/logs/sample-logs-protobuf/1/rescue.log`, // TODO: ローカルでunxzコマンドをつかって解凍したログを使用しているが、rescue.log.xzをそのままアップロードできるようにする
    host
  ).href;

  const [rescuelog, setRescuelog] = useState(log);

  useEffect(() => {
    const ajax = new XMLHttpRequest();
    ajax.open("GET", fetchUrl, true);
    ajax.responseType = "arraybuffer";
    ajax.onload = () => {
      parseRCRSLog(ajax.response);
    };
    ajax.send();
  }, []);

  return { rescuelog: rescuelog, setRescuelog: setRescuelog };
}

export default useRescueLog;
