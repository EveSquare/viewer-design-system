import type { NextPage } from "next";
import { ExplanationPage } from "@/components/pages/ExplanationPage";
import { Heading, VStack } from "@chakra-ui/react";
import { ImageCard } from "@/components/molecules/ImageCard";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const Buildings: React.FC = () => {
    const { t, i18n } = useTranslation();
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

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common']))
        },
    };
}


export default BuildingsPage;