import type { NextPage } from "next";
import Image from "next/image";
import { ExplanationPage } from "@/components/pages/ExplanationPage";
import { Heading, Text, Box } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const UseMap: React.FC = () => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <Heading mb={"2rem"}>{t("マップ操作")}</Heading>
            <Text fontSize='2xl'>{t("マップの拡大縮小")}</Text>
            <Text>{t("マップを拡大縮小するには、マウスのホイールの回転または、またはトラックパッドのピンチイン・ピンチアウトをします。")}</Text>
            <Image
                src="/Resources/img/explanation/bigsmall.gif"
                width={600}
                height={300}
                alt={t("マップの拡大縮小")}
            />
            <Box m={"4rem"}></Box>
            <Text fontSize='2xl'>{t("マップの移動")}</Text>
            <Text>{t("マップを移動するには、ドラッグをします。")}</Text>
            <Image
                src="/Resources/img/explanation/mapmove.gif"
                width={600}
                height={300}
                alt={t("マップの移動")}
            />
        </>
    )
}

const UseMapPage: NextPage = () => {

    return (
        <>
            <ExplanationPage pageKey="map">
                <UseMap />
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


export default UseMapPage;