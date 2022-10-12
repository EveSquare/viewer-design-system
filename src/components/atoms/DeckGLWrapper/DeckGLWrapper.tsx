import { Box } from "@chakra-ui/react";
import React from "react";
import { Props } from "./type";

export const DeckGLWrapper: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Box
                height={"100%"}
                width={"100%"}
            >
                <Box
                    position={"relative"}
                    height={"100%"}
                    transition={"height 600ms ease-in 0s"}
                    overflow={"hidden !important"}
                >
                    {children}
                </Box>
            </Box>
        </>
    );
}

DeckGLWrapper.displayName = "DECKGLWRAPPER";