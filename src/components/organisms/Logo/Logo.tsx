import { Center, Link, Text } from "@chakra-ui/react";
import React from "react";
import { LogoImage } from "@/components/atoms/LogoImage";
import { useTranslation } from 'react-i18next';

export const Logo: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Link href="/" _hover={{ textDecoration: 'none' }} title={t("ホームへ戻る")}>
        <Center>
          <LogoImage width={100} height={45} />
          <Text
            as="b"
            mx={2}
            fontSize="2rem"
            userSelect="none"
          >RRSViewer</Text>
        </Center>
      </Link>
    </>
  );
}

Logo.displayName = "LOGO";