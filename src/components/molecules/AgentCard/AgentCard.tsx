import { AgentIcon } from "@/components/atoms/AgentIcon";
import { Card } from "@/components/atoms/Card";
import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Props } from "./type"

export const AgentCard: React.FC<Props> = (props) => {
    return (
        <>
            <Card
                h="100px"
                w="100%"
                display="flex"
                alignItems="center"
                title={`クリックすると${props.title}の詳細が表示されます`}
                onClick={props.onClick}
            >
                <Box m={["1.5rem", "0.8rem"]} >
                    <AgentIcon agentType={props.agentType} />
                </Box>
                <Box minW="0">
                    <Heading fontSize="xl">{props.title}</Heading>
                    <Text
                        mt={4}
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                    >{props.description}
                    </Text>
                </Box>
            </Card>
        </>
    );
}

AgentCard.displayName = "AGENTCARD";