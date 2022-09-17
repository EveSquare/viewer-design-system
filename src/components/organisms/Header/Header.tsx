import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Flex, Tooltip, Text, HStack, Spacer } from "@chakra-ui/react";
import React from "react";
import { Props } from './type'
import { Logo } from "@/components/organisms/Logo";

export const Header: React.FC<Props> = ({ stepCount, stepTooltip, score, maxScore, scoreTooltip, onOpenSetting, isShowing }) => {
    return (
        <>
            {isShowing == "show" ?
                <Flex
                    justify="space-between"
                    alignItems="center"
                    wrap="nowrap"
                    w="100%"
                    h="65px"
                    pr={'1rem'}
                    bg="bg"
                    userSelect="none"
                >
                    <Box m={2}>
                        <Logo />
                    </Box>
                    <Box>
                        <Tooltip
                            label={stepTooltip}
                            aria-label={stepTooltip}
                            closeDelay={500}
                        >
                            <Text fontSize="2xl" as="b">STEP: {stepCount}</Text>
                        </Tooltip>
                    </Box>
                    <Spacer />
                    <HStack spacing={4}>
                        <Tooltip
                            label={scoreTooltip}
                            aria-label={scoreTooltip}
                            closeDelay={500}
                        >
                            <Text fontSize="2xl" as="b">
                                SCORE: {score}/<Text fontSize='xl' as="span">{maxScore}</Text>
                            </Text>
                        </Tooltip>
                        <SettingsIcon
                            w="24px"
                            h="24px"
                            _hover={{ color: 'primary' }}
                            onClick={onOpenSetting}
                        />
                    </HStack>
                </Flex>
                :
                <Flex
                    alignItems="end"
                    justify="center"
                    w="100%"
                    h="65px"
                    p={['0', '1rem']}
                >
                    <Spacer />
                    <SettingsIcon
                        w="24px"
                        h="24px"
                        _hover={{ color: 'primary' }}
                        onClick={onOpenSetting}
                    />
                </Flex>
            }
        </>
    );
}

Header.displayName = "HEADER";