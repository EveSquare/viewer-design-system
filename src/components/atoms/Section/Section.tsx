import { Box, Text, useColorModeValue, Link } from "@chakra-ui/react";
import React from "react";
import { Props } from './type';
import NextLink from "next/link";

export const Section: React.FC<Props> = ({ text, href }) => {

    const themeColor = useColorModeValue("black", "white");

    return (
        <>
            <NextLink href={href} passHref>
                <Link textDecoration={"none"}>
                    <Box
                        as="li"
                        borderLeftWidth={"1px"}
                        borderLeftColor={themeColor}
                        paddingLeft={4}
                        listStyleType={"none"}
                    >
                        <Box
                            as="li"
                            title={text}
                            userSelect={"none"}
                            fontWeight={"medium"}
                            _before={{
                                content: "'−'",
                                color: themeColor,
                                position: "absolute",
                                left: "3rem",
                                top: "4.75rem",
                            }}
                            _hover={{
                                bg: "secondaryHover",
                                borderRadius: "md",
                            }}
                        >
                            <Text p={"5px"}>{text}</Text>
                        </Box>
                    </Box>
                </Link>
            </NextLink>
        </>
    );
}

Section.displayName = "SECTION";