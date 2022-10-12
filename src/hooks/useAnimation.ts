import { useState, useEffect, useCallback } from "react";
import { Animation } from '@/common/viewer/type';

function useAnimation(maxsteps: number) {
  const [animation] = useState<Animation>({ id: 0 });
  const [time, setTime] = useState(0);
  const [step, setStep] = useState(0);
  const [isPause, setIsPause] = useState(false);

  const animationSpeed = 1;
  const stepDuration = 60;
  const loopLength = stepDuration * maxsteps;

  const animate = useCallback(() => {
    setTime((t) => (t + animationSpeed) % loopLength);
    animation.id = window.requestAnimationFrame(animate);
  }, [animation]);

  useEffect(() => {
    animation.id = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animation.id);
  }, [animation]);

  useEffect(() => {
    const s = Math.floor(time / stepDuration);
    if (!isPause && step < s) {
      setStep(step + 1);
    }
  }, [time]);

  return { time: time, step: step, isPause: isPause, setStep: setStep, setTime: setTime, setIsPause: setIsPause };
}
export default useAnimation;
