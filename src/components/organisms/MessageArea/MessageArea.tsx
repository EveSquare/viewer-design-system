import { Live2d } from "@/components/atoms/Live2d";
import { SpeechBubbles } from "@/components/atoms/SpeechBubbles";
import { Box } from "@chakra-ui/react";
import React from "react";
import { Props } from './type'

export const MessageArea: React.FC<Props> = (props) => {

    const width = 300;
    const margin = 50;
    const offset = "100px";

    return (
        <>
            {props.isShowing == "show" ?
                <Box>
                    <Box
                        position="fixed"
                        bottom="30"
                        maxWidth="calc(100% - 350px - 100px)"
                        width="calc(100vw - 350px - 350px)" // live2d - sidebar
                        right={width + margin}
                    >
                        <SpeechBubbles />
                    </Box>
                    <Live2d
                        width={width}
                        height={350}
                        bottom={20}
                        ModelList={["unitychan"]}
                    />
                </Box>
                :
                <></>
            }
        </>
    );
}

MessageArea.displayName = "MESSAGEAREA";