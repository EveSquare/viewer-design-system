import { useState, useEffect } from "react";
import { Simulation } from "@/lib/RCRS";

function useLog() {
  const [simulation, setSimulation] = useState(new Simulation());
  const [lastLoadLogId, setLastLoadLogId] = useState(0);
  const [logMaxStepToLoad, setLogMaxStepToLoad] = useState(0);

  useEffect(() => {
    let id = lastLoadLogId;
    const host = process.env.NEXT_PUBLIC_LOG_HOST;
    const fetchLogData = async () => {
      const fetchUrl = new URL(`/Resources/logs/sample-logs/1-1/${id}`, host)
        .href;

      const log: Uint8Array | null = await fetch(fetchUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error("fetch faild");
          }
          return res.arrayBuffer();
        })
        .then((buf) => {
          return new Uint8Array(buf);
        })
        .catch(() => {
          return null;
        });

      if (log) {
        await simulation.process(log);
        const processedStep = simulation.getTotalTimeSteps();
        if (processedStep <= logMaxStepToLoad) {
          const world = await simulation.getWorld(0);
          if (!world.isUpdated) {
            id++;
            fetchLogData();
          }
        } else {
          setLastLoadLogId(id);
        }
      }
    };
    fetchLogData();
  }, [logMaxStepToLoad]);

  return {
    simulation: simulation,
    setSimulation: setSimulation,
    setLogMaxStepToLoad: setLogMaxStepToLoad,
  };
}
export default useLog;
