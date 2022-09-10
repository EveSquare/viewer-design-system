import { Box, Center, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react"

const MainViewer = dynamic(() => import("src/components/pages/MainViewer").then((cmp) => cmp.MainViewer), { ssr: false });


const Viewer: NextPage = () => {
    return (
        <>
            <MainViewer>
                <Box w={"100%"} h={"100%"} bg="primary">

                </Box>
            </MainViewer>
        </>
    )
}

export default Viewer;