import { Center, Text } from "@chakra-ui/react";
import React from "react";
import { LogoImage } from "@/components/atoms/LogoImage";

export const Logo: React.FC = () => {
  return (
    <>
      <Center>
        <Text
          as="b"
          mr={2}
          fontSize="2rem"
          userSelect="none"
        >RRSViewer</Text>
        <LogoImage width={120} height={65} />
      </Center>
    </>
  );
}

Logo.displayName = "LOGO";