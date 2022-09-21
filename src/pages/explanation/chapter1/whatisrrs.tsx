import type { NextPage } from "next";
import { ExplanationPage } from "@/components/pages/ExplanationPage";
import { Box, Heading, List, ListIcon, ListItem, Spacer, Text } from "@chakra-ui/react";
import { MdCheckCircle } from 'react-icons/md';


const WhatIsRRS: NextPage = () => {
    return (
        <>
            <ExplanationPage pageKey="whatisrrs">
                <Heading mb={"2rem"}>RCRSとは</Heading>
                <Text>
                    RoboCup Rescue Simulation(RCRS)とは都市直下型地震で被災した仮想都市における災害救助シミュレーションのことです。複数種類のロボットの協力による救助活動でいかに災害の被害を抑えられるかを競います。
                </Text>
                <Box m={"4rem"}></Box>
                <Text fontSize={"3xl"} mb={"2rem"}>目標は高いスコアを維持すること</Text>
                <Text mb={4}>被害状況が悪化するとスコア(都市の価値)が減少します。</Text>
                <List spacing={3}>
                    <ListItem>
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        避難する市⺠を多く救助しよう
                    </ListItem>
                    <ListItem>
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        瓦礫を除去し効率よく救助しよう
                    </ListItem>
                    <ListItem>
                        <ListIcon as={MdCheckCircle} color='green.500' />
                        ロボット同士で協力しよう
                    </ListItem>
                </List>
            </ExplanationPage>
        </>
    )
}


export default WhatIsRRS;