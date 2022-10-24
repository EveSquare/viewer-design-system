import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Flex, Tooltip, Text, HStack, Spacer } from "@chakra-ui/react";
import React from "react";
import { Props } from './type'
import { Logo } from "@/components/organisms/Logo";
import { HeaderBase } from "@/components/atoms/HeaderBase";
import { Icon } from '@chakra-ui/react';
import { MdOutlineInfo } from 'react-icons/md';

export const Header: React.FC<Props> = ({ stepCount, stepTooltip, score, maxScore, scoreTooltip, onOpenSetting, isShowing }) => {
    return (
        <>
            {isShowing == "show" ?
                <HeaderBase bg="bg">
                    <Box m={2}>
                        <Logo />
                    </Box>
                    <Box>
                        <Tooltip
                            label={stepTooltip}
                            aria-label={stepTooltip}
                            closeDelay={500}
                        >
                            <Text fontSize="2xl" as="b">STEP<Icon as={MdOutlineInfo} w={"16px"} mr={1}></Icon>: {stepCount}</Text>
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
                                SCORE<Icon as={MdOutlineInfo} w={"16px"} mr={1}></Icon>: {score}/<Text fontSize='xl' as="span">{maxScore}</Text>
                            </Text>
                        </Tooltip>
                        <SettingsIcon
                            w="24px"
                            h="24px"
                            _hover={{ color: 'primary' }}
                            onClick={onOpenSetting}
                        />
                    </HStack>
                </HeaderBase>
                :
                <HeaderBase>
                    <Spacer />
                    <SettingsIcon
                        w="24px"
                        h="24px"
                        _hover={{ color: 'primary' }}
                        onClick={onOpenSetting}
                    />
                </HeaderBase>
            }
        </>
    );
}

Header.displayName = "HEADER";