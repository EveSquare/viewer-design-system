import { HeaderBase } from "@/components/atoms/HeaderBase";
import { IconText } from "@/components/atoms/IconText";
import { Section } from "@/components/atoms/Section";
import { Logo } from "@/components/organisms/Logo";
import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import React from "react";
import { RiPoliceCarLine } from 'react-icons/ri';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { Props } from './type';


export const ExplanationPage: React.FC<Props> = ({ children, pageKey }) => {

    const sideBarInfo = [
        {
            key: "chapter1",
            text: "競技の説明",
            icon: RiPoliceCarLine,
            sections: [
                {
                    key: 'whatistherrs',
                    text: "はじめに１：RRSとは",
                    href: "/explanation/chapter1/whatisrrs",
                },
                {
                    key: 'whatistheagent',
                    text: "はじめに２：エージェントとは",
                    href: "/explanation/chapter1/whatistheagent",
                },
            ]
        },
        {
            key: "chapter2",
            text: "競技の流れ",
            icon: QuestionOutlineIcon,
            sections: [
                {
                    key: 'flowofthegame',
                    text: "競技の流れ１：競技の流れ",
                    href: "/explanation/chapter2/flowofthegame",
                },
                {
                    key: 'flowofthegame2',
                    text: "競技の流れ２：競技の流れ",
                    href: "/explanation/chapter2/flowofthegame",
                },
            ],
        },
    ]

    const headerHeight = "65px";

    return (
        <>
            <Box>
                <Grid
                    templateAreas={`"header header"
                                "sidebar main"`}
                    gridTemplateRows={'65px 1fr'}
                    templateColumns={'400px 1fr'}
                >
                    <GridItem area="header">
                        <HeaderBase>
                            <Box m={2}>
                                <Logo />
                            </Box>
                        </HeaderBase>
                    </GridItem>
                    <GridItem area="sidebar" bg={"bg"} h={`calc(100vh - ${headerHeight})`}>
                        <Flex justify="center" flexDirection={"column"} alignItems={"center"}>
                            <Box w={"300px"} pt={"7rem"}>
                                {sideBarInfo.map((item) => (
                                    <Box key={item.key}>
                                        <IconText icon={item.icon} text={item.text}></IconText>
                                        <Box my={"1rem"}>
                                            {item.sections.map((section) => (
                                                <Box key={section.key} pl={"0.7rem"}>
                                                    <Section
                                                        text={section.text}
                                                        href={section.href}
                                                        isSelected={section.key === pageKey}
                                                    ></Section>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Flex>
                    </GridItem>
                    <GridItem area="main" bg={"bg"} h={`calc(100vh - ${headerHeight})`} w={"100%"} overflowY={"scroll"}>
                        <Box mx={"4rem"} p={"6rem"}>
                            {children}
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </>
    );
}

ExplanationPage.displayName = "EXPLANATIONPAGE";