import type { NextPage } from "next";
import Image from "next/image";
import { ExplanationPage } from "@/components/pages/ExplanationPage";
import { Heading, VStack, Text } from "@chakra-ui/react";
import { ImageCard } from "@/components/molecules/ImageCard";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const UseExplainationModal: React.FC = () => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <Heading mb={"2rem"}>{t("説明モーダル操作")}</Heading>
            <Text>{t("外部リンクの上にあるボタンを押すと説明モーダルが表示されます。")}</Text>
            <Text>{t("説明モーダルは、閉じるボタンを押すことで閉じることができます。")}</Text>
            <Image
                src="/Resources/img/explanation/modal.gif"
                width={600}
                height={350}
                alt={t("説明モーダル操作の説明の画像")}
            />
        </>
    )
}

const UseExplainationModalPage: NextPage = () => {

    return (
        <>
            <ExplanationPage pageKey="explainationmodal">
                <UseExplainationModal />
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


export default UseExplainationModalPage;