import { Box, Button, Icon, useColorModeValue, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Props } from "./type";
import { IoIosRefresh } from "react-icons/io";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useTranslation } from "next-export-i18n";

export const DeckGLWrapper: React.FC<Props> = ({ children, onResetAction, onZoomInAction, onZoomOutAction }) => {

    const [isButtonHovered, setIsButtonHovered] = useState(false);
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
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                >
                    <Box
                        position={"absolute"}
                        right={"10px"}
                        top={"10px"}
                    >
                        <Button
                            aria-label={t('マップを初期位置に戻す')}
                            title={t('マップを初期位置に戻す')}
                            onClick={onResetAction}
                        >
                            <Icon as={IoIosRefresh} color={iconColor} />
                            {isButtonHovered && <Text ml={1}>{t("表示をリセット")}</Text>}
                        </Button>
                    </Box>
                    <Box
                        position={"absolute"}
                        right={"10px"}
                        top={"50px"}
                    >
                        <Button
                            aria-label={t('マップ拡大')}
                            title={t('マップ拡大')}
                            onClick={onZoomInAction}
                        >
                            <Icon as={AiOutlinePlus} color={iconColor} />
                            {isButtonHovered && <Text ml={1}>{t("マップを拡大")}</Text>}
                        </Button>
                    </Box>
                    <Box
                        position={"absolute"}
                        right={"10px"}
                        top={"90px"}
                    >
                        <Button
                            aria-label={t('マップ縮小')}
                            title={t('マップ縮小')}
                            onClick={onZoomOutAction}
                        >
                            <Icon as={AiOutlineMinus} color={iconColor} />
                            {isButtonHovered && <Text ml={1}>{t("マップを縮小")}</Text>}
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