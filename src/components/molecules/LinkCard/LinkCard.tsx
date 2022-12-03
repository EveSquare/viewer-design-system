import { Card } from "@/components/atoms/Card";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Center, HStack, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Props } from './type';
import NextLink from "next/link";
import { useTranslation, useLanguageQuery } from "next-export-i18n";

export const LinkCard: React.FC<Props> = ({ prependIcon, title, href, ...props }) => {
    const { t } = useTranslation();
    const [query] = useLanguageQuery();
    return (
        <>
            <NextLink href={{ pathname: href, query: query }} passHref>
                <Link
                    w="100%"
                    isExternal
                >
                    <Card
                        p={["1.5rem", "0.8rem"]}
                        borderWidth="1px"
                        borderRadius="lg"
                        boxShadow="md"
                        title={t("LinkCardTitle", { title: title })}
                    >
                        <Center>
                            <HStack spacing={3}>
                                {prependIcon}
                                <Text as="b" fontSize="xl">{title}</Text>
                                <ExternalLinkIcon color="primary" />
                            </HStack>
                        </Center>
                    </Card>
                </Link>
            </NextLink>
        </>
    );
}

LinkCard.displayName = "LINKCARD";