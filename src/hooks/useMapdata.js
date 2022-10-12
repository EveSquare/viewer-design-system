import { useState, useEffect } from "react";
import data from "../data/sample-logs/6/map.json";

function useMapdata() {
  const [mapdata, setMapdata] = useState(data);
  return { mapdata: mapdata, setMapdata: setMapdata };
}
export default useMapdata;
