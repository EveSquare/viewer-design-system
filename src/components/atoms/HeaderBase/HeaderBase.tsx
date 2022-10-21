import React from "react";
import { Props } from './type'
import { Flex } from "@chakra-ui/react";

export const HeaderBase: React.FC<Props> = (props) => {
    return (
        <>
            <Flex
                justify="space-between"
                alignItems="center"
                wrap="nowrap"
                w="100%"
                h="65px"
                pr={'1rem'}
                userSelect="none"
                {...props}
            >
                {props.children}
            </Flex>
        </>
    );
}

HeaderBase.displayName = "HEADERBASE";