import React from "react";
import { Props, LogSection } from './type';
import { Box, Center, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { HeaderBase } from "@/components/atoms/HeaderBase";
import { Logo } from "@/components/organisms/Logo";
import { LogCard } from "@/components/molecules/LogCard";

export const LogList: React.FC<Props> = ({ logSections }) => {

    return (
        <>
            <Box>
                <Grid
                    templateAreas={`"header"
                                    "main"`}
                    gridTemplateColumns={`300px 1fr`}
                    w={"100vw"}
                >
                    <GridItem area={'header'}>
                        <HeaderBase>
                            <Box m={2}>
                                <Logo />
                            </Box>
                        </HeaderBase>
                    </GridItem>
                    <GridItem area={'main'}>
                        <Center w={"100vw"} p={2}>
                            <Text fontSize='3xl'>ログ一覧</Text>
                        </Center>
                        {logSections.map((logSection: LogSection, i: number) => (
                            <Box key={logSection.sectionName} mt={"4rem"}>
                                <Box px={4}>
                                    <Text fontSize='3xl' as="b">人気</Text>
                                </Box>
                                <Flex
                                    w={"100vw"}
                                    overflowX={"auto"}
                                    css={
                                        {
                                            '&::-webkit-scrollbar': {
                                                width: 'auto',
                                                height: "0.5rem",
                                            },
                                            '&::-webkit-scrollbar-track': {
                                                width: 'auto',
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                background: "#606060",
                                                borderRadius: '0.8rem',
                                            }
                                        }}
                                >
                                    {logSection.logs.map((logInfo, i) => (
                                        <LogCard
                                            key={i}
                                            title={logInfo.title}
                                            description={logInfo.description}
                                            href={logInfo.href}
                                            tags={logInfo.tags}
                                        />
                                    ))}
                                </Flex>
                            </Box>
                        ))}
                    </GridItem>
                </Grid>
            </Box>
        </>
    );
}

LogList.displayName = "LOGLIST";