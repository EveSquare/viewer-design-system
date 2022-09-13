import { PriorityForce, PriorityIdle, PriorityNone } from "../../atoms/SpeechBubbles/const";

export interface Props { }

interface Position {
    x: number;
    y: number;
}

export interface Message {
    /**
     * メッセージの内容
     */
    message: string;
    /**
     * 優先度の設定
     */
    priority: typeof PriorityNone | typeof PriorityIdle | typeof PriorityForce,
    /**
     * 作成日時
     */
    created_at: Date,
    /**
     * 更新日時
     */
    updated_at: Date,
    /**
     * 表示終了した日時
     */
    finished_at?: Date,
    /**
     * 表示可能日時
     */
    timeLimit_at: Date,
    /**
     * 発生位置
     */
    position: Position,
}