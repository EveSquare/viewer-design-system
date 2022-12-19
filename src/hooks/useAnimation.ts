import { useState, useEffect, useCallback } from "react";
import { Animation } from '@/common/viewer/type';

import { STEP_DULATION } from '@/common/viewer/const';

function useAnimation(maxsteps: number) {
  const [animation] = useState<Animation>({ id: 0 });
  const [time, setTime] = useState(0);
  const [step, setStep] = useState(0);
  const [isPause, setIsPause] = useState(true);

  const animationSpeed = 1;
  const loopLength = STEP_DULATION * maxsteps;

  const animate =() => {
    setTime((t) => (t + animationSpeed) % loopLength);
    animation.id = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    animation.id = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animation.id);
  }, [animation]);

  useEffect(() => {
    const s = Math.floor(time / STEP_DULATION);
    if (!isPause && step < s) {
      setStep(step + 1);
    }
  }, [time]);

  return { time: time, step: step, isPause: isPause, STEP_DULATION: STEP_DULATION, setStep: setStep, setTime: setTime, setIsPause: setIsPause };
}
export default useAnimation;
