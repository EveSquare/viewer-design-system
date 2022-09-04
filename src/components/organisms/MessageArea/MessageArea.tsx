import { Live2d } from "@/components/atoms/Live2d";
import { SpeechBubbles } from "@/components/atoms/SpeechBubbles";
import { Box } from "@chakra-ui/react";
import React from "react";
import { Props } from './type'

export const MessageArea: React.FC<Props> = (props) => {

    const width = 300;
    const offset = "100px";

    return (
        <>
            {props.isShowing ?
                <Box>
                    <Box
                        position="fixed"
                        bottom="30"
                        width="calc(100vw - 300px - 100px)"
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