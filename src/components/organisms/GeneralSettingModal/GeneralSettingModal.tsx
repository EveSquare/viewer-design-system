import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Props } from './type'
import { useTranslation } from 'react-i18next';
import { SectionBar } from "@/components/atoms/SectionBar";

export const GeneralSettingModal: React.FC<Props> = ({ onClose, isOpen, size, state, setState }) => {
    const { t, i18n } = useTranslation();

    return (
        <>
            <Modal
                onClose={onClose || (() => { })}
                isOpen={isOpen}
                scrollBehavior="inside"
                size={size || "3xl"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t('表示設定')}</ModalHeader>
                    <ModalCloseButton title={t("設定を閉じる")} />
                    <ModalBody>
                        <Box userSelect="none">
                            <FormControl as='fieldset'>
                                <FormLabel as='legend'>{t("カラーモードの設定")}</FormLabel>
                                <RadioGroup
                                    onChange={value => setState({ ...state, colorMode: value })}
                                    value={state.colorMode}
                                >
                                    <Stack>
                                        <Radio value='light'>{t('ライト')}</Radio>
                                        <Radio value='dark'>{t('ダーク')}</Radio>
                                    </Stack>
                                </RadioGroup>
                                <FormHelperText>{t('画面の色を変更できます')}</FormHelperText>
                            </FormControl>

                            <SectionBar my="1rem" />

                            <FormControl as='fieldset'>
                                <FormLabel as='legend'>{t("ヘッダの表示設定")}</FormLabel>
                                <RadioGroup
                                    onChange={value => setState({ ...state, headerVisibility: value })}
                                    value={state.headerVisibility}
                                >
                                    <Stack>
                                        <Radio value='show'>{t('表示')}</Radio>
                                        <Radio value='hide'>{t('非表示')}</Radio>
                                    </Stack>
                                </RadioGroup>
                                <FormHelperText>{t('ヘッダの表示・非表示を切り替えます')}</FormHelperText>
                            </FormControl>

                            <SectionBar my="1rem" />

                            <FormControl as='fieldset'>
                                <FormLabel as='legend'>{t("サイドバーの表示設定")}</FormLabel>
                                <RadioGroup
                                    onChange={value => setState({ ...state, sideBarVisibility: value })}
                                    value={state.sideBarVisibility}
                                >
                                    <Stack>
                                        <Radio value='show'>{t('表示')}</Radio>
                                        <Radio value='hide'>{t('非表示')}</Radio>
                                    </Stack>
                                </RadioGroup>
                                <FormHelperText>{t('サイドバーの表示・非表示を切り替えます')}</FormHelperText>
                            </FormControl>

                            <SectionBar my="1rem" />

                            <FormControl as='fieldset'>
                                <FormLabel as='legend'>{t("キャラクターの表示設定")}</FormLabel>
                                <RadioGroup
                                    onChange={value => setState({ ...state, characterVisibility: value })}
                                    value={state.characterVisibility}
                                >
                                    <Stack>
                                        <Radio value='show'>{t('表示')}</Radio>
                                        <Radio value='hide'>{t('非表示')}</Radio>
                                    </Stack>
                                </RadioGroup>
                                <FormHelperText>{t('キャラクターの表示・非表示を切り替えます')}</FormHelperText>
                            </FormControl>

                            <FormControl as='fieldset'>
                                <FormLabel as='legend'>{t("スライダーの表示設定")}</FormLabel>
                                <RadioGroup
                                    onChange={value => setState({ ...state, sliderKitVisibility: value })}
                                    value={state.sliderKitVisibility}
                                >
                                    <Stack>
                                        <Radio value='show'>{t('表示')}</Radio>
                                        <Radio value='hide'>{t('非表示')}</Radio>
                                    </Stack>
                                </RadioGroup>
                                <FormHelperText>{t('スライダーの表示・非表示を切り替えます')}</FormHelperText>
                            </FormControl>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose || (() => { })}>{t('閉じる')}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

GeneralSettingModal.displayName = "GENERALSETTINGMODAL";