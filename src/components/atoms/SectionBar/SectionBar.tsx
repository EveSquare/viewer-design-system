import { Box, Divider } from "@chakra-ui/react";
import React from "react";

interface Props {
  m?: number | string | Array<string>;
}

export const SectionBar: React.FC<Props> = (props) => {
  return (
    <>
      <Box w="100%" m={props.m}>
        <Divider orientation='horizontal' />
      </Box>
    </>
  );
}

SectionBar.displayName = "SECTIONBAR";