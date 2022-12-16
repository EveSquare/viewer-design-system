import { Box, Flex, Grid, GridItem, HStack } from "@chakra-ui/react";
import React from "react";
import { Props } from './type'
import { SideBar } from "@/components/organisms/SideBar";
import { Header } from "@/components/organisms/Header";
import { MessageArea } from "@/components/organisms/MessageArea";
import { SliderKit } from "@/components/organisms/SliderKit";

export const MainViewerTemplate: React.FC<Props> = ({ children, sideBarInfo, headerInfo, characterIsShowing, sliderArgs }) => {

    const sidebar_width = sideBarInfo.isShowing === "show" ? "300px" : "0px";

    return (
        <>
            <Box overflow={"hidden"} width={"100vw"} height={"100vh"} position={"relative"}>
                <Box position="fixed">
                    <Grid
                        templateAreas={`"header header"
                                        "sidebar main"`}
                        gridTemplateRows={'65px 1fr'}
                        gridTemplateColumns={`${sidebar_width} 1fr`}
                        w={"100vw"}
                        zIndex={2}
                    >
                        <GridItem area={'header'}>
                            <Header {...headerInfo} />
                        </GridItem>
                        <GridItem area={'sidebar'}>
                            <SideBar {...sideBarInfo} />
                        </GridItem>
                        <GridItem area={'main'}>
                            {children}
                        </GridItem>
                    </Grid>
                </Box>
                {/* <Box
                    zIndex={3}
                    width={"80%"}
                    position={"absolute"}
                    bottom={"-25px"}
                    right={"-40px"}
                >
                    <MessageArea isShowing={characterIsShowing} />
                </Box> */}
                <Box bg="bg" zIndex={3} position="fixed" bottom={0} width="100vw">
                    <Box px={10}>
                        <SliderKit {...sliderArgs} />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

MainViewerTemplate.displayName = "MAINVIEWERTEMPLATE";