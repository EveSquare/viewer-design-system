import React, { forwardRef } from "react";
import { Props } from './type';
import { Badge, Box, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Card } from "@/components/atoms/Card";
import NextLink from "next/link";
import { useLanguageQuery } from 'next-export-i18n';

export const LogCard: React.FC<Props> = ({ title, description, url, tags }) => {
    const [query] = useLanguageQuery();
    return (
        <>
            <NextLink href={{ pathname: url, query: query }}>
                <Card
                    minW={"450px"}
                    h={"165px"}
                    m={2}
                    p={"1rem"}
                    title={description}
                >
                    <Text fontSize="2xl">{title}</Text>
                    <Box m={"4rem"} />
                    <Flex>
                        <Box>
                            <Stack direction='row' overflow="hidden">
                                {tags.map((tag, i) => (
                                    <Badge key={i} colorScheme={tag.color} fontSize='0.9rem'>{tag.tag.name}</Badge>
                                ))}
                            </Stack>
                        </Box>
                        <Spacer />
                        <ArrowForwardIcon w={"24px"} h={"24px"} />
                    </Flex>
                </Card>
            </NextLink>
        </>
    );
}

LogCard.displayName = "LOGCARD";