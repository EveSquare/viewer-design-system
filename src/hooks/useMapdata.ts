import { useState } from "react";
import { load } from '@loaders.gl/core';
import { JSONLoader } from '@loaders.gl/json';

//TODO: 動的に変更できるようにする
async function useMapdata() {

  const host = process.env.NEXT_PUBLIC_LOG_HOST;
  const mapUrl = new URL(process.env.NEXT_PUBLIC_DEFAULT_LOG_BASE_PATH + "/map.json", host).href;
  const mapData = await load(mapUrl, JSONLoader);

  const [mapdata, setMapdata] = useState(mapData);
  return { mapdata: mapdata, setMapdata: setMapdata };
}
export default useMapdata;
