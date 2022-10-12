import { useState, useEffect } from "react";
import { Animation } from '@/common/viewer/type';

function useAnimation() {
  const [animation] = useState<Animation>({ id: 0 });
  const [time, setTime] = useState(0);
  const [step, setStep] = useState(0);
  const [isPause, setIsPause] = useState(false);

  const animationSpeed = 10;
  const stepDuration = 60;
  const maxsteps = 300;
  const loopLength = stepDuration * maxsteps;

  const animate = () => {
    setTime((t) => (t + animationSpeed) % loopLength);
    animation.id = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    animation.id = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animation.id);
  }, [animation]);

  useEffect(() => {
    if (!isPause && Math.floor(time % stepDuration) === 0) {
      setStep(step + 1);
    }
  }, [time]);

  return { time: time, step: step, isPause: isPause, setStep: setStep, setIsPause: setIsPause };
}
export default useAnimation;
