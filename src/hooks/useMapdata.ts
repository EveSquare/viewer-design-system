import { useState } from "react";
import { LOG_BASE_PATH } from "@/common/viewer/const";
import getConfig from "next/config";
import { load } from '@loaders.gl/core';
import { JSONLoader } from '@loaders.gl/json';

//TODO: 動的に変更できるようにする
async function useMapdata() {

  const host = getConfig().publicRuntimeConfig.LOG_HOST;
  const mapUrl = new URL(LOG_BASE_PATH + "/map.json", host).href;
  const mapData = await load(mapUrl, JSONLoader);

  const [mapdata, setMapdata] = useState(mapData);
  return { mapdata: mapdata, setMapdata: setMapdata };
}
export default useMapdata;
