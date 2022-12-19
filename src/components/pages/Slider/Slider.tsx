import React, { memo, useEffect, useState } from "react";

import { Simulation } from "@/lib/RCRS";
import { MAX, STEP_DULATION } from "@/common/viewer/const";

import { Box } from "@chakra-ui/react";
import { SliderKit } from "@/components/organisms/SliderKit";

import { Props as SliderProps } from "@/components/organisms/SliderKit/type";

type Props = {
  simulation: Simulation;
  step: number;
  maxsteps: number;
  setIsPause: any;
  setStep: any;
  setTime: any;
};

// eslint-disable-next-line react/display-name
const Slider = memo(({ ...props }: Props) => {
  const [sliderKitState, setSliderKitState] = React.useState({
    isPlaying: false,
    isDisabled: false,
    value: 0,
    max: props.maxsteps,
  });

  useEffect(() => {
    setSliderKitState({ ...sliderKitState, value: props.step });
  }, [props.step]);

  const sliderArgs: SliderProps = {
    isPlaying: sliderKitState.isPlaying,
    isDisabled: sliderKitState.isDisabled,
    value: sliderKitState.value,
    max: sliderKitState.max - 1, // +1をフェッチしているため表示上は-1する
    onChange: (value: number) => {
      setSliderKitState({ ...sliderKitState, value: value, isPlaying: false });
      props.setIsPause(!false);
      props.setStep(value);
      props.setTime(value * STEP_DULATION);
    },
    onChangeEnd: () => {},
    onClickPlayButton: () => {
      setSliderKitState({
        ...sliderKitState,
        isPlaying: !sliderKitState.isPlaying,
      });
      props.setIsPause(sliderKitState.isPlaying);
      props.setTime(props.step * STEP_DULATION);
    },
    isShowing: "show",
  };

  return (
    <Box bg="bg" position="fixed" zIndex={3} bottom={0} width="100vw">
      <Box px={10}>
        <SliderKit {...sliderArgs} />
      </Box>
    </Box>
  );
});
export default Slider;
