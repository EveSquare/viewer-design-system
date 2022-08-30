import { Box, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Agent } from "./type";

interface Props {
    agentType: Agent;
    w?: string | number;
    h?: string | number;
}

export const AgentIcon: React.FC<Props> = ({ agentType, w, h }) => {
    const { colorMode } = useColorMode()
    return (
        <>
            <Box
                borderRadius="1.5rem"
                backgroundColor={agentType}
                border={colorMode == 'light' ? '1px' : ''}
                width={w || "48px"}
                height={h || "48px"}
            />
        </>
    );
}

AgentIcon.displayName = "AGENTICON";