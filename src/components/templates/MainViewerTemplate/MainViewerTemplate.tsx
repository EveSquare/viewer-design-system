import { Box, Flex, HStack } from "@chakra-ui/react";
import React from "react";
import { Props } from './type'
import { SideBar } from "@/components/organisms/SideBar";
import { Header } from "@/components/organisms/Header";
import { MessageArea } from "@/components/organisms/MessageArea";

export const MainViewerTemplate: React.FC<Props> = ({ children, sideBarInfo, headerInfo, characterIsShowing }) => {
    return (
        <>
            <Box zIndex={1} position="absolute">
                <Flex w="100vw">
                    <SideBar
                        {...sideBarInfo}
                    />
                    <Header
                        {...headerInfo}
                    />
                </Flex>
            </Box>
            <Box zIndex={2}>
                <MessageArea
                    isShowing={characterIsShowing}
                />
            </Box>
            <Box zIndex={-1} w="100vw" h="100vh">
                {children}
            </Box>
        </>
    );
}

MainViewerTemplate.displayName = "MAINVIEWERTEMPLATE";