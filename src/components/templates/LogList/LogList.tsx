import React from "react";
import { Props, LogSection } from './type';
import { Box, Center, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { HeaderBase } from "@/components/atoms/HeaderBase";
import { Logo } from "@/components/organisms/Logo";
import { LogCard } from "@/components/molecules/LogCard";
import { useTranslation } from 'next-i18next';

export const LogList: React.FC<Props> = ({ logSections }) => {
    const { t, i18n } = useTranslation();
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
                            <Text fontSize='3xl'>{t("ログ一覧")}</Text>
                        </Center>
                        {logSections.map((logSection: LogSection, i: number) => (
                            <Box key={logSection.sectionName} mt={"4rem"}>
                                <Box px={4}>
                                    <Text fontSize='3xl' as="b">{t("人気")}</Text>
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
                                            url={logInfo.url}
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