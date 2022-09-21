import { Box, Text, useColorModeValue, Link } from "@chakra-ui/react";
import React from "react";
import { Props } from './type';
import NextLink from "next/link";

export const Section: React.FC<Props> = ({ text, href, isSelected }) => {

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
                            title={text}
                            userSelect={"none"}
                            fontWeight={"medium"}
                            bg={isSelected ? "secondaryHover" : "none"}
                            borderRadius={"md"}
                            _hover={{
                                bg: "secondaryHover",
                            }}
                        >
                            <Text
                                p={"5px"}
                                _before={{
                                    content: "'−'",
                                    color: themeColor,
                                    position: "relative",
                                    right: "22px",
                                    textDecoration: "none",
                                    display: "inline-block",
                                }}
                            >{text}</Text>
                        </Box>
                    </Box>
                </Link>
            </NextLink>
        </>
    );
}

Section.displayName = "SECTION";