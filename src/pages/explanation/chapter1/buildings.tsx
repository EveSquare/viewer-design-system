import type { NextPage } from "next";
import Image from "next/image";
import { ExplanationPage } from "@/components/pages/ExplanationPage";
import { Heading, VStack, Text } from "@chakra-ui/react";
import { ImageCard } from "@/components/molecules/ImageCard";
import { useTranslation } from "next-export-i18n";

export const Buildings: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <Heading mb={"2rem"}>{t("建物等の紹介")}</Heading>
            <VStack
                spacing={4}
                align='stretch'
            >
                <ImageCard
                    src="/Resources/img/building.png"
                    title={t("建物")}
                    description={t("多くの市民が取り残されている")}
                />
                <ImageCard
                    src="/Resources/img/shelter.png"
                    title={t("避難所")}
                    description={t("全ての市民の避難場所")}
                />
                <ImageCard
                    src="/Resources/img/road.png"
                    title={t("道路")}
                    description={t("市民やロボットが使用する通路")}
                />
                <ImageCard
                    src="/Resources/img/debris.png"
                    title={t("瓦礫")}
                    description={t("通路を塞ぎ、市民やロボットの通行の妨げとなる")}
                />
            </VStack>
            <Text mt={6}>{t("建物には倒壊度があります。倒壊度は色の変化によって見ることができます。")}</Text>
            <Text>{t('倒壊度は5段階で表わされています。左から倒壊度1最後が倒壊度5となります。')}</Text>
            <Image
                src="/Resources/img/building_broken_level_group.png"
                width={600}
                height={120}
                alt={t("建物の倒壊度を5段階で表した建物の画像5つがならんでいる")}
            ></Image>
        </>
    )
}

const BuildingsPage: NextPage = () => {

    return (
        <>
            <ExplanationPage pageKey="buildings">
                <Buildings />
            </ExplanationPage>
        </>
    )
}


export default BuildingsPage;