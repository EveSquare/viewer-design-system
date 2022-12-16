import { Box, Flex, Grid, GridItem, HStack } from "@chakra-ui/react";
import React from "react";
import { Props } from "./type";
import { Header } from "@/components/organisms/Header";
import { MessageArea } from "@/components/organisms/MessageArea";

export const MainViewerTemplate: React.FC<Props> = ({
  children,
  sideBarInfo,
  headerInfo,
  characterIsShowing,
}) => {
  const sidebar_width = sideBarInfo.isShowing === "show" ? "300px" : "0px";

  return (
    <>
      <Box
        overflow={"hidden"}
        width={"100vw"}
        height={"100vh"}
        position={"relative"}
      >
        <Box position="fixed">
          <Grid
            templateAreas={`"header header"
                                        "sidebar main"`}
            gridTemplateRows={"65px 1fr"}
            gridTemplateColumns={`${sidebar_width} 1fr`}
            w={"100vw"}
            zIndex={2}
          >
            <GridItem area={"header"}>
              <Header {...headerInfo} />
            </GridItem>
            <GridItem area={"sidebar"}></GridItem>
            <GridItem area={"main"}>{children}</GridItem>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

MainViewerTemplate.displayName = "MAINVIEWERTEMPLATE";
