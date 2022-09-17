import React from "react";
import { Props } from './type'
import { RiPoliceCarLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import {
    Slider as CSlider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Box,
    Tooltip,
} from '@chakra-ui/react'

export const Slider: React.FC<Props> = ({ min, max, value, onChange, isDisabled, onChangeEnd }) => {
    const [showTooltip, setShowTooltip] = React.useState(false)

    const { t, i18n } = useTranslation();
    return (
        <>
            <CSlider
                aria-label={t("STEPを移動するスライダー")}
                defaultValue={0}
                min={min || 0}
                max={max}
                step={1}
                isDisabled={isDisabled}
                value={value}
                onChange={(v) => onChange(v)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onChangeEnd={(v) => onChangeEnd(v)}
            >
                <SliderTrack bg='primary.50'>
                    <SliderFilledTrack bg='primary' />
                </SliderTrack>
                <Tooltip
                    hasArrow
                    bg='primary'
                    color='white'
                    placement='top'
                    isOpen={showTooltip}
                    label={value}
                >
                    <SliderThumb />
                </Tooltip>
                <SliderThumb boxSize={6}>
                    <Box color='primary' as={RiPoliceCarLine} />
                </SliderThumb>
            </CSlider>
        </>
    );
}

Slider.displayName = "SLIDER";