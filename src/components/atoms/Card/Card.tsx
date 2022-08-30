import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

export const Card: React.FC<BoxProps> = (props) => {
    return (
        <>
            <Box
                userSelect="none"
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
                _hover={{ backgroundColor: "secondaryHover", cursor: "pointer" }}
                {...props}
            >
                {props.children}
            </Box>
        </>
    );
}

Card.displayName = "CARD";