import { Box, Button, Icon, useColorModeValue, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Props } from "./type";
import { IoIosRefresh } from "react-icons/io";
import { useTranslation } from "next-export-i18n";

export const DeckGLWrapper: React.FC<Props> = ({ children, onResetAction }) => {

    const [isResetButtonHovered, setIsResetButtonHovered] = useState(false);
    const iconColor = useColorModeValue("black", "white");
    const { t } = useTranslation();

    return (
        <>
            <Box
                height={"100%"}
                width={"100%"}
            >
                <Box
                    position={"relative"}
                    zIndex={1}
                    onMouseEnter={() => setIsResetButtonHovered(true)}
                    onMouseLeave={() => setIsResetButtonHovered(false)}
                >
                    <Box
                        position={"absolute"}
                        right={"10px"}
                        top={"10px"}
                        transition={"all 1s 0s ease"}
                    >
                        <Button
                            aria-label={t('マップを初期位置に戻す')}
                            title={t('マップを初期位置に戻す')}
                            onClick={onResetAction}
                        >
                            <Icon as={IoIosRefresh} color={iconColor} />
                            {isResetButtonHovered ? <Text ml={1}>{t("表示をリセット")}</Text> : <></>}
                        </Button>
                    </Box>
                </Box>
                <Box
                    position={"relative"}
                    height={"100%"}
                    transition={"height 600ms ease-in 0s"}
                    overflow={"hidden !important"}
                >
                    {children}
                </Box>
            </Box>
        </>
    );
}

DeckGLWrapper.displayName = "DECKGLWRAPPER";