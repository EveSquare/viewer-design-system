import { Agent } from "@/components/atoms/AgentIcon/type"

export interface Props {
    /**
     * モーダルタイトル
     */
    title: string;
    /**
     * モーダル下部にある閉じるボタンのテキスト
     */
    closeButtonText?: string;
    /**
     * モーダルボディに入る内容
     */
    children: React.ReactNode | any;
    /**
     * モーダルの状態管理
     */
    isOpen: boolean;
    /**
     * モーダルを閉じる
     */
    onClose: () => void;
    /**
     * モーダルのサイズ
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full";
    /** 
     * エージェントの指定があるときアイコンを表示
     */
    agentType?: Agent;
}

