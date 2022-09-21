import React from "react";
import { Props } from './type';
import { Flex, Icon, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export const IconText: React.FC<Props> = ({ icon, text, iconSize, fontSize, textMarginLeft, href }) => {
    return (
        <>
            {href ?
                <Flex
                    alignItems="bottom"
                >
                    <Icon
                        as={icon}
                        w={iconSize || "22px"}
                        h={iconSize || "22px"}
                    ></Icon>
                    <Text
                        ml={textMarginLeft || "6px"}
                        fontSize={fontSize || "md"}
                        as='b'
                        userSelect="none"
                    >{text}</Text>
                </Flex>
                :
                <NextLink href={href as string} passHref>
                    <Link>
                        <Flex
                            alignItems="bottom"
                        >
                            <Icon
                                as={icon}
                                w={iconSize || "22px"}
                                h={iconSize || "22px"}
                            ></Icon>
                            <Text
                                ml={textMarginLeft || "6px"}
                                fontSize={fontSize || "md"}
                                as='b'
                                userSelect="none"
                            >{text}</Text>
                        </Flex>
                    </Link>
                </NextLink>
            }
        </>
    );
}

IconText.displayName = "ICONTEXT";