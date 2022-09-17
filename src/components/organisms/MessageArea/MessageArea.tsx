import { Live2d } from "@/components/atoms/Live2d";
import { SpeechBubbles } from "@/components/atoms/SpeechBubbles";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { Props } from './type';

export const MessageArea: React.FC<Props> = (props) => {

    const width = 250;

    return (
        <>
            {props.isShowing == "show" ?
                <Grid templateColumns={`1fr ${width}px`}>
                    <GridItem my={"auto"}>
                        <SpeechBubbles />
                    </GridItem>
                    <GridItem>
                        <Box clipPath={"circle(80px at 50% 35%)"}>
                            <Live2d
                                width={width}
                                height={250}
                                ModelList={["unitychan"]}
                            />
                        </Box>
                    </GridItem>
                </Grid>
                :
                <></>
            }
        </>
    );
}

MessageArea.displayName = "MESSAGEAREA";