import { Box, Flex, HStack } from "@chakra-ui/react";
import React from "react";
import { Props } from './type'
import { SideBar } from "@/components/organisms/SideBar";
import { Header } from "@/components/organisms/Header";
import { MessageArea } from "@/components/organisms/MessageArea";
import { SliderKit } from "@/components/organisms/SliderKit";

export const MainViewerTemplate: React.FC<Props> = ({ children, sideBarInfo, headerInfo, characterIsShowing, sliderArgs }) => {
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
            <Box bg="bg" zIndex={1} position="absolute" bottom={"15px"} width="100vw">
                <Box px={10}>
                    <SliderKit
                        {...sliderArgs}
                    ></SliderKit>
                </Box>
            </Box>
            <Box zIndex={-1} w="100vw" h="100vh">
                {children}
            </Box>
        </>
    );
}

MainViewerTemplate.displayName = "MAINVIEWERTEMPLATE";