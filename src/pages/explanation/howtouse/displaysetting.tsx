import type { NextPage } from "next";
import Image from "next/image";
import { ExplanationPage } from "@/components/pages/ExplanationPage";
import { Heading, VStack, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const UseDisplaySetting: React.FC = () => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <Heading mb={"2rem"}>{t("表示設定")}</Heading>
            <Text>{t("表示設定では、以下の項目について設定をおこなうことができます。")}</Text>
            <UnorderedList>
                <ListItem>{t("カラーモードの設定")}</ListItem>
                <ListItem>{t("ヘッダの表示設定")}</ListItem>
                <ListItem>{t("サイドバーの表示設定")}</ListItem>
                <ListItem>{t("キャラクターの表示設定")}</ListItem>
                <ListItem>{t("スライダーの表示設定")}</ListItem>
            </UnorderedList>
            <Text>{t("カラーモードの設定では、ダークモードとライトモードの切り替えができます。")}</Text>
            <Image
                src="/Resources/img/explanation/setting.gif"
                width={600}
                height={350}
                alt={t("ダークモードとライトモードの切り替えを行う動画")}
            />
        </>
    )
}

const UseDisplaySettingPage: NextPage = () => {

    return (
        <>
            <ExplanationPage pageKey="buildings">
                <UseDisplaySetting />
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


export default UseDisplaySettingPage;