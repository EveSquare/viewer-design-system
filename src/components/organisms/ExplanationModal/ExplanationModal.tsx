import { AgentIcon } from "@/components/atoms/AgentIcon";
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import React from "react";
import { Props } from './type'

export const ExplanationModal: React.FC<Props> = ({ title, closeButtonText, children, isOpen, onOpen, onClose, size, agentType }) => {
    return (
        <>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                scrollBehavior="inside"
                size={size || "3xl"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {
                            agentType ?
                                (
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Box m={['', '1rem']}>
                                            <AgentIcon agentType={agentType} w="20px" h="20px" />
                                        </Box>
                                        <Text>{title}</Text>
                                    </Box>
                                )
                                :
                                (<>{title}</>)
                        }
                    </ModalHeader>
                    <ModalCloseButton title="説明を閉じる" />
                    <ModalBody>
                        {children}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>{closeButtonText}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

ExplanationModal.displayName = "EXPLANATIONMODAL";