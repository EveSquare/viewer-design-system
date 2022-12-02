import { Center, Link, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { LogoImage } from "@/components/atoms/LogoImage";
import { useTranslation } from "next-export-i18n";

export const Logo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Link href="/" _hover={{ textDecoration: 'none' }} title={t("ログ一覧へ")}>
        <Tooltip label={t("ログ一覧へ")}>
          <Center>
            <LogoImage width={100} height={45} />
            <Text
              as="b"
              mx={2}
              fontSize="2rem"
              userSelect="none"
            >RRSViewer</Text>
          </Center>
        </Tooltip>
      </Link>
    </>
  );
}

Logo.displayName = "LOGO";