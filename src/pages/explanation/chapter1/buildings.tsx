import type { NextPage } from "next";
import { ExplanationPage } from "@/components/pages/ExplanationPage";
import { Box, Flex, Heading, List, ListIcon, ListItem, Icon, Text, VStack, Grid, GridItem } from "@chakra-ui/react";
import { ImageCard } from "@/components/molecules/ImageCard";

export const Buildings: React.FC = () => {
    return (
        <>
            <Heading mb={"2rem"}>建物等の紹介</Heading>
            <VStack
                spacing={4}
                align='stretch'
            >
                <ImageCard
                    src="/Resources/img/building.svg"
                    title="建物"
                    description="多くの市民が取り残されている"
                />
                <ImageCard
                    src="/Resources/img/shelter.svg"
                    title="避難所"
                    description="全ての市民の避難場所"
                />
                <ImageCard
                    src="/Resources/img/road.svg"
                    title="道路"
                    description="市民やロボットが使用する通路"
                />
                {/* <ImageCard
                        src="/Resources/img/road.svg"
                        title="瓦礫"
                        description="通路を塞ぎ、市民やロボットの通行の妨げとなる"
                    /> */}
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


export default BuildingsPage;