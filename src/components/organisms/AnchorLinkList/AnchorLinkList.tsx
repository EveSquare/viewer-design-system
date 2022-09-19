import React from "react";
import { Props } from './type'
import { PageLink } from "@/components/atoms/PageLink";
import { Box } from "@chakra-ui/react";

export const AnchorLinkList: React.FC<Props> = ({ links }) => {
    return (
        <>
            <Box
                as="ol"
                listStyleType={"none"}
                marginInlineStart={4}
                marginLeft={0}
                marginTop={4}
            >
                {links.map((link, index) => (
                    <Box
                        key={index}
                        as="li"
                        borderLeftWidth={"1px"}
                        borderLeftColor={"gray.600"}
                        paddingLeft={4}
                    >
                        <PageLink
                            href={link.href}
                            title={link.title}
                        />
                    </Box>
                ))
                }
            </Box>
        </>
    );
}

AnchorLinkList.displayName = "ANCHORLINKLIST";