import React from "react";
import { Props } from './type'
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { Text, HStack, Icon, IconButton } from '@chakra-ui/react'
import { Slider } from "@/components/atoms/Slider";
import { useTranslation } from "next-export-i18n";

export const SliderKit: React.FC<Props> = ({ isPlaying, isDisabled, isShowing, value, max, onChange, onChangeEnd, onClickPlayButton }) => {
    const { t } = useTranslation();

    const min = 0;
    return (
        <>
            {isShowing == "show" ?
                <HStack height={"40px"}>
                    <IconButton
                        mr={3}
                        colorScheme={isPlaying ? undefined : "primary"}
                        aria-label={t("再生/停止")}
                        isDisabled={isDisabled}
                        icon={isPlaying ? <Icon as={BsPauseFill} /> : <Icon as={BsPlayFill} />}
                        onClick={() => onClickPlayButton()}
                    >
                    </IconButton>
                    <Text pr="2">{min}</Text>
                    <Slider
                        min={min}
                        max={max}
                        isDisabled={isDisabled}
                        value={value}
                        onChange={(v) => onChange(v)}
                        onChangeEnd={(v) => onChangeEnd(v)}
                    ></Slider>
                    <Text>{max}</Text>
                </HStack>
                :
                <></>
            }
        </>
    );
}

SliderKit.displayName = "SLIDERKIT";