import React from "react";
import { chakra, useColorModeValue } from "@chakra-ui/react";

export const SectionBar: React.FC = () => {
  const color = useColorModeValue("black", "white");
  return (
    <chakra.div
      height="1px"
      backgroundColor={color}
      m="0rem 1.2rem"
    >
    </chakra.div>
  );
}

SectionBar.displayName = "SectionBar";