import React, { useEffect, useState, useCallback, useRef } from "react";
import { StyledSpeechBubbles } from '@/components/atoms/SpeechBubbles/module.style'
import { Props, Message } from './type'
import { Box, SlideFade, Text } from "@chakra-ui/react";
import { MessageUpdateCycle, BlankMessage } from "./const";
import { nextMessage } from "./logic";


export const SpeechBubbles = React.memo((props: Props) => {

    const [message, setMessage] = useState<Message>(BlankMessage);
    const [queueMessages, setQueueMessages] = useState<Array<Message>>([]);
    const [messageLogs, setMessageLogs] = useState<Array<Message>>([]);
    const [isAnimation, setIsAnimation] = useState(true);

    const messageRef = useRef(message);
    const queueMessagesRef = React.useRef(queueMessages);
    const messageLogsRef = React.useRef(messageLogs);

    const receiveMessageHandler = useCallback((event: CustomEvent) => {
        const receivedMessage = event.detail;
        queueMessagesRef.current = [...queueMessagesRef.current, receivedMessage];
        setQueueMessages([...queueMessagesRef.current]);
    }, []);

    useEffect(() => {
        window.addEventListener('speechMessage', (receiveMessageHandler) as EventListenerOrEventListenerObject);
        return () => {
            window.removeEventListener("speechMessage", (receiveMessageHandler) as EventListenerOrEventListenerObject);
        };
    }, [receiveMessageHandler]);

    const useInterval = (callback: () => void) => {
        const callbackRef = useRef<() => void>(callback);
        useEffect(() => {
            callbackRef.current = callback;
        }, [callback]);

        useEffect(() => {
            const tick = () => { callbackRef.current() }
            const id = setInterval(tick, MessageUpdateCycle);
            return () => {
                clearInterval(id);
            };
        }, []);
    };

    const watchQueueMessage = () => {
        if (queueMessages.length === 0) return;

        const { newMessage, copyQueueMessages } = nextMessage(queueMessagesRef.current);
        queueMessagesRef.current = copyQueueMessages;
        setQueueMessages([...queueMessagesRef.current]);

        if (typeof newMessage === undefined) return;

        messageRef.current = newMessage;
        setMessage(messageRef.current);
        setIsAnimation(false);
        setTimeout(() => {
            setIsAnimation(true);
        }, 150);

        newMessage.finished_at = new Date();
        messageLogsRef.current = [...messageLogsRef.current, newMessage];
        setMessageLogs([...messageLogsRef.current]);

    }

    useInterval(watchQueueMessage);

    return (
        <>
            <SlideFade in={isAnimation} offsetY='20px'>
                {message.text !== null ?
                    <StyledSpeechBubbles>
                        <Text>{message.text}</Text>
                    </StyledSpeechBubbles>
                    :
                    <></>
                }
            </SlideFade>
            {props.isDebug ?
                <>
                    {queueMessages.map((message, index) => {
                        return (
                            <Box key={index}>
                                <Text>TEXT: {message.text}</Text>
                                <Text>PRIORITY: {message.priority}</Text>
                                <Text>CREATED_AT: {message.created_at.toLocaleString()}</Text>
                            </Box>
                        )
                    })}
                </>
                :
                <></>
            }
        </>
    );
});

SpeechBubbles.displayName = "SPEECHBUBBLES";