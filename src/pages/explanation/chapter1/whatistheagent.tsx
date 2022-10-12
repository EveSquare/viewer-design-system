import type { NextPage } from "next";
import { ExplanationPage } from "@/components/pages/ExplanationPage";
import { Box, Flex, Heading, List, ListIcon, ListItem, Icon, Text, VStack, Grid, GridItem } from "@chakra-ui/react";
import { ImageCard } from "@/components/molecules/ImageCard";

export const WhatIsTheAgent: React.FC = () => {
    return (
        <>
            <Heading mb={"2rem"}>人工知能ロボット(エージェント)の紹介</Heading>
            <Text>
                人工知能ロボットは互いに通信・協力しながら最適な災害救助活動を目指します。
            </Text>
            <VStack
                spacing={4}
                align='stretch'
            >
                <ImageCard
                    src="/Resources/img/ambulance.svg"
                    title="救急隊"
                    description="自力で動けない市民を避難所まで搬送"
                />
                <ImageCard
                    src="/Resources/img/fire.svg"
                    title="消防隊"
                    description="建物に埋まってしまって動けない市民と人工知能ロボットを救出"
                />
                <ImageCard
                    src="/Resources/img/police.svg"
                    title="土木隊"
                    description="道路を塞いでいるがれきを撤去"
                />
            </VStack>
            <Box m={"4rem"}></Box>
            <Text fontSize={"3xl"} mb={"2rem"}>市民の紹介</Text>
            <Text mb={4}>
                市民は避難所に着くことを目指します。緑色で表示されます。
            </Text>
            <ImageCard
                src="/Resources/img/civilian.svg"
                title="市民"
                description="自力で避難所まで向かう"
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