import { Box, Flex, HStack } from "@chakra-ui/react";
import React from "react";
import { Props } from './type'
import { SideBar } from "@/components/organisms/SideBar";
import { Header } from "@/components/organisms/Header";
import { MessageArea } from "@/components/organisms/MessageArea";

export const MainViewerTemplate: React.FC<Props> = ({ children, agentDatas, linkDatas, headerInfo }) => {
    return (
        <>
            <Box zIndex={1} position="absolute">
                <Flex w="100vw">
                    <SideBar
                        agentDatas={agentDatas}
                        linkDatas={linkDatas}
                    />
                    <Header
                        stepCount={headerInfo.stepCount}
                        stepTooltip={headerInfo.stepTooltip}
                        score={headerInfo.score}
                        scoreTooltip={headerInfo.scoreTooltip}
                        onOpenSetting={headerInfo.onOpenSetting}
                    />
                </Flex>
            </Box>
            <Box zIndex={2}>
                <MessageArea
                    isShowing={true}
                />
            </Box>
            <Box zIndex={-1} w="100vw" h="100vh">
                {children}
            </Box>
        </>
    );
}

MainViewerTemplate.displayName = "MAINVIEWERTEMPLATE";