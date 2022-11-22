import type { NextPage } from "next";
import Image from "next/image";
import { ExplanationPage } from "@/components/pages/ExplanationPage";
import { Heading, VStack, Text } from "@chakra-ui/react";
import { ImageCard } from "@/components/molecules/ImageCard";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const UseSlider: React.FC = () => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <Heading mb={"2rem"}>{t("スライダー操作")}</Heading>
            <Text>{t("スライダー操作は、マウスでアイコンを左右へドラッグすることで操作することができます。")}</Text>
            <Text>{t("また、横のボタンを押すことで再生・停止をすることができます。")}</Text>
            <Text>{t("スライダーを動かすと自動的に停止状態になります。再開させる場合は横のボタンを押します。")}</Text>
            <Text>{t("スライダー横の数字は左が最小ステップ数、右が最大ステップ数を表します。")}</Text>
            <Image
                src="/Resources/img/explanation/slider.gif"
                width={200}
                height={100}
                alt={t("スライダー操作の説明の画像")}
            />
        </>
    )
}

const UseSliderPage: NextPage = () => {

    return (
        <>
            <ExplanationPage pageKey="slider">
                <UseSlider />
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


export default UseSliderPage;