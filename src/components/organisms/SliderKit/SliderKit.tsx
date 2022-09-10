import React from "react";
import { Props } from './type'
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { Box, Button, Flex, HStack, Icon, IconButton } from '@chakra-ui/react'
import { Slider } from "@/components/atoms/Slider";
import { t } from "i18next";

export const SliderKit: React.FC<Props> = ({ isPlaying, isDisabled, value, max, onChange, onChangeEnd, onClickPlayButton }) => {
    return (
        <>
            <HStack>
                <IconButton
                    mr={3}
                    colorScheme={isPlaying ? undefined : "primary"}
                    aria-label={t("再生/停止")}
                    isDisabled={isDisabled}
                    icon={isPlaying ? <Icon as={BsPlayFill} /> : <Icon as={BsPauseFill} />}
                    onClick={() => onClickPlayButton()}
                >
                </IconButton>
                <Slider
                    min={0}
                    max={max}
                    isDisabled={isDisabled}
                    value={value}
                    onChange={(v) => onChange(v)}
                    onChangeEnd={() => onChangeEnd()}
                ></Slider>

            </HStack>
        </>
    );
}

SliderKit.displayName = "SLIDERKIT";