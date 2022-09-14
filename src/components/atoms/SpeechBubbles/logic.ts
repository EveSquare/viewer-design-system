import { Message } from './type'
import { PriorityForce, PriorityIdle, BlankMessage } from "./const";

function checkTimeLimit(message: Message): boolean {
    return message.timeLimit_at.getTime() > Date.now();
}

interface ReturnType {
    newMessage: Message;
    copyQueueMessages: Array<Message>;
}

export const nextMessage = (queueMessages: Array<Message>): ReturnType => {
    const copyQueueMessages = [...queueMessages];
    if (copyQueueMessages.length === 0) {
        return { newMessage: BlankMessage, copyQueueMessages };
    }

    const forcePriorityMessages = copyQueueMessages.filter((message) => message.priority === PriorityForce);
    if (forcePriorityMessages.length > 0) {
        for (const message of forcePriorityMessages) {
            if (checkTimeLimit(message)) {
                const _newMessage = forcePriorityMessages.shift() as Message;
                return {
                    newMessage: _newMessage,
                    copyQueueMessages: copyQueueMessages.filter((message => message.created_at !== _newMessage.created_at)),
                }
            }

        }
    }

    const idlePriorityMessages = copyQueueMessages.filter((message) => message.priority === PriorityIdle);
    if (idlePriorityMessages.length > 0) {
        for (const message of idlePriorityMessages) {
            if (checkTimeLimit(message)) {
                const _newMessage = idlePriorityMessages.shift() as Message;
                return {
                    newMessage: _newMessage,
                    copyQueueMessages: copyQueueMessages.filter(message => message.created_at !== _newMessage.created_at),
                }
            }
        }
    }

    return {
        newMessage: copyQueueMessages.shift() as Message,
        copyQueueMessages: copyQueueMessages,
    }
}