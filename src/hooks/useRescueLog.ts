import { useState } from 'react';
import { LOG_BASE_PATH } from "@/common/viewer/const";
import getConfig from "next/config";
import { load } from '@loaders.gl/core';
import { JSONLoader } from '@loaders.gl/json';

async function useRescueLog() {

    const host = process.env.NEXT_PUBLIC_LOG_HOST;
    const rescueLogDataUrl = new URL(LOG_BASE_PATH + "/full/1.json", host).href;
    const rescueLogData = await load(rescueLogDataUrl, JSONLoader);

    const [rescuelog, setRescueLog] = useState(rescueLogData);
    return { rescuelog: rescuelog, setRescueLog: setRescueLog }
}
export default useRescueLog;