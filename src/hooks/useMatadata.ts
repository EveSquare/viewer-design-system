import { useState } from "react";
import { LOG_BASE_PATH } from "@/common/viewer/const";
import getConfig from "next/config";
import { load } from '@loaders.gl/core';
import { JSONLoader } from '@loaders.gl/json';

//TODO: 動的に変更できるようにする
async function useMetadata() {

    const host = getConfig().publicRuntimeConfig.LOG_HOST;
    const metaUrl = new URL(LOG_BASE_PATH + "/meta.json", host).href;
    const metaData = await load(metaUrl, JSONLoader);

    const [mapdata, setMapdata] = useState(metaData);
    return { mapdata: mapdata, setMapdata: setMapdata };
}
export default useMetadata;
