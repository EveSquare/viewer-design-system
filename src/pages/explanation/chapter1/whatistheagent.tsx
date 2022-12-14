import type { NextPage } from "next";
import { ExplanationPage } from "@/components/pages/ExplanationPage";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { ImageCard } from "@/components/molecules/ImageCard";
import { useTranslation } from "next-export-i18n";
import Image from 'next/image'

export const WhatIsTheAgent: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Heading mb={"2rem"}>{t("人工知能ロボット(エージェント)の紹介")}</Heading>
            <Text>
                {t("人工知能ロボットは互いに通信・協力しながら最適な災害救助活動を目指します。")}
            </Text>
            <VStack
                spacing={4}
                align='stretch'
            >
                <ImageCard
                    src="/Resources/img/ambulance.svg"
                    title={t("救急隊")}
                    description={t("自力で動けない市民を避難所まで搬送")}
                />
                <ImageCard
                    src="/Resources/img/fire.svg"
                    title={t("消防隊")}
                    description={t("建物に埋まってしまって動けない市民と人工知能ロボットを救出")}
                />
                <ImageCard
                    src="/Resources/img/police.svg"
                    title={t("土木隊")}
                    description={t("道路を塞いでいるがれきを撤去")}
                />
            </VStack>
            <Box m={"4rem"}></Box>
            <Text fontSize={"3xl"} mb={"2rem"}>{t("市民の紹介")}</Text>
            <Text mb={4}>
                {t("市民は避難所に着くことを目指します。緑色で表示されます。")}
            </Text>
            <ImageCard
                src="/Resources/img/civilian.svg"
                title={t("市民")}
                description={t("自力で避難所まで向かう")}
            />
            <Text>{t('市民には負傷度があります。負傷度は色の変化によって見ることができます。')}</Text>
            <Text>{t('負傷度が高いほど緑色から黒色へ近づきます。')}</Text>
            <Image
                src="/Resources/img/civilian_Injury.png"
                width={600}
                height={120}
                alt={t('負傷度により色の変化を表した画像')}
            />
        </>
    )
}

const WhatIsTheAgentPage: NextPage = () => {

    return (
        <>
            <ExplanationPage pageKey="whatistheagent">
                <WhatIsTheAgent />
            </ExplanationPage>
        </>
    )
}

export default WhatIsTheAgentPage;