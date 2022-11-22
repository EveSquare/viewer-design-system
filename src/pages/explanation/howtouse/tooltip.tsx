import type { NextPage } from "next";
import Image from "next/image";
import { ExplanationPage } from "@/components/pages/ExplanationPage";
import { Heading, VStack, Text } from "@chakra-ui/react";
import { ImageCard } from "@/components/molecules/ImageCard";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const UseToolTip: React.FC = () => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <Heading mb={"2rem"}>{t("ツールチップ操作")}</Heading>
            <Text>{t("ツールチップ操作は、カーソルをホバーすることで表示できます。")}</Text>
            <Image
                src="/Resources/img/explanation/tooltip1.gif"
                width={200}
                height={100}
                alt={t("ツールチップ操作の説明の画像")}
            />
            <Image
                src="/Resources/img/explanation/tooltip2.gif"
                width={200}
                height={100}
                alt={t("ツールチップ操作の説明の画像")}
            />
        </>
    )
}

const UseToolTipPage: NextPage = () => {

    return (
        <>
            <ExplanationPage pageKey="tooltip">
                <UseToolTip />
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


export default UseToolTipPage;