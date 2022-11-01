import type { NextPage } from "next";
import { WhatIsTheAgent } from "./whatistheagent";
import { WhatIsRRS } from "./whatisrrs";
import { Buildings } from "./buildings";
import { ExplanationPage } from "@/components/pages/ExplanationPage";
import { Box } from "@chakra-ui/react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ChapterOne: NextPage = () => {

    return (
        <>
            <ExplanationPage pageKey="">
                <WhatIsRRS />
                <Box m={"4rem"}></Box>
                <WhatIsTheAgent />
                <Box m={"4rem"}></Box>
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


export default ChapterOne;