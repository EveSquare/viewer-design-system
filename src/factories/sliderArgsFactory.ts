import { Props } from "@/components/organisms/SliderKit/type";

export const sliderArgs: Props = {
    isPlaying: false,
    isDisabled: false,
    isShowing: "show",
    value: 0,
    max: 100,
    onChange: (v: number) => { },
    onChangeEnd: () => { },
    onClickPlayButton: () => { }
}