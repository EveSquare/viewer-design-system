import React, { useEffect, useState } from "react";
import { StyledSpeechBubbles } from '@/components/atoms/SpeechBubbles/module.style'
import { Props } from './type'
import { Box, Button, chakra, SlideFade, Text, useDisclosure } from "@chakra-ui/react";

const _SpeechBubbles = chakra(Box, {
    baseStyle: {
        position: 'relative',
        backgroundColor: 'secondary',
        padding: ['1.125rem', '1.5rem'],
        fontSize: '1.25rem',
        borderWidth: "1px",
        borderRadius: "lg",
        boxShadow: "md",
        _before: {
            content: '""',
            position: 'absolute',
            width: 0,
            height: 0,
            right: '-1rem',
            bottom: '2.5rem',
            rotate: '90deg',
            border: '.75rem solid transparent',
            borderTop: 'none',
            borderBottomColor: 'secondary',
            dropShadow: '(0 - 0.0625rem 0.0625rem rgba(0, 0, 0, .1))',
        }
    }
})

export const SpeechBubbles: React.FC<Props> = (props) => {

    const [message, setMessage] = useState("")
    const [isAnimation, setIsAnimation] = useState(true)

    // TODO: アニメーションが3回発火している
    useEffect(() => {
        window.addEventListener('speechMessage', (event: Event) => {
            console.log(event);
            setMessage(event.detail.message)
            setIsAnimation(false)
            setTimeout(() => {
                setIsAnimation(true)
            }, 150)
        })
    }, [])

    return (
        <>
            <SlideFade in={isAnimation} offsetY='20px'>
                <StyledSpeechBubbles>
                    <Text>{message}</Text>
                    {Math.random()}
                </StyledSpeechBubbles>
            </SlideFade>
        </>
    );
}

SpeechBubbles.displayName = "SPEECHBUBBLES";