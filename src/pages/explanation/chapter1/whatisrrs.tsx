import type { NextPage } from "next";
import { ExplanationPage } from "@/components/pages/ExplanationPage";
import { Box, Heading, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { MdCheckCircle } from 'react-icons/md';
import { useTranslation } from "next-export-i18n";

export const WhatIsRRS: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Heading mb={"2rem"}>{t("RRSとは")}</Heading>
            <Text>
                {t("RoboCup Rescue Simulation(RRS)とは都市直下型地震で被災した仮想都市における災害救助シミュレーションのことです。複数種類のロボットの協力による救助活動でいかに災害の被害を抑えられるかを競います。")}
            </Text>
            <Box m={"4rem"}></Box>
            <Text fontSize={"3xl"} mb={"2rem"}>{t("目標は高いスコアを維持すること")}</Text>
            <Text mb={4}>{t("被害状況が悪化するとスコア(都市の価値)が減少します。")}</Text>
            <List spacing={3}>
                <ListItem>
                    <ListIcon as={MdCheckCircle} color='green.500' />
                    {t("避難する市⺠を多く救助しよう")}
                </ListItem>
                <ListItem>
                    <ListIcon as={MdCheckCircle} color='green.500' />
                    {t("瓦礫を除去し効率よく救助しよう")}
                </ListItem>
                <ListItem>
                    <ListIcon as={MdCheckCircle} color='green.500' />
                    {t("ロボット同士で協力しよう")}
                </ListItem>
            </List>
        </>
    )
}


const WhatIsRRSPage: NextPage = () => {
    return (
        <>
            <ExplanationPage pageKey="whatisrrs">
                <WhatIsRRS />
            </ExplanationPage>
        </>
    )
}

export default WhatIsRRSPage;