import { Message } from "./type";

export const PriorityNone = 0;

export const PriorityIdle = 1;

export const PriorityForce = 2;

// ミリ秒
export const MessageUpdateCycle: number = 5000;

export const BlankMessage: Message = {
    text: null,
    priority: PriorityNone,
    created_at: new Date(),
    updated_at: new Date(),
    timeLimit_at: new Date(),
    position: { x: 0, y: 0 },
}