import { ExplanationPage } from "@/components/pages/ExplanationPage";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UseMap } from "./map";
import { UseSlider } from "./slider";
import { UseToolTip } from "./tooltip";
import { UseExplainationModal } from "./explainationmodal";
import { UseDisplaySetting } from "./displaysetting";
import { Box } from "@chakra-ui/react";

const HowtoUse: NextPage = () => {
    return (
        <>
            <ExplanationPage pageKey="">
                <UseMap />
                <Box m={"4rem"}></Box>
                <UseSlider />
                <Box m={"4rem"}></Box>
                <UseToolTip />
                <Box m={"4rem"}></Box>
                <UseExplainationModal />
                <Box m={"4rem"}></Box>
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

export default HowtoUse;