import React from "react";
import { Props } from './type'
import { Box, Link } from "@chakra-ui/react";

export const PageLink: React.FC<Props> = ({ href, title }) => {
    return (
        <>
            <Box
                as="li"
                title={title}
                listStyleType={"none"}
            >
                <Link
                    href={href}
                    pt={1}
                    pb={1}
                    display={"block"}
                    ml={2}
                    fontWeight={"medium"}
                    color={"whiteAlpha.600"}
                    transition={"all 0.2s ease-in 0s"}
                    backgroundColor={"transparent"}
                    textDecoration={"inherit"}
                    _hover={{ color: "white" }}
                >
                    {title}
                </Link>
            </Box>
        </>
    );
}

PageLink.displayName = "PAGELINK";