import { Agent } from "@/components/atoms/AgentIcon/type";

export interface Props {
    /**
     * エージェントのタイプ
     */
    agentType: Agent;
    /**
     * 見出し　タイトル
     */
    title: string;
    /**
     * サブタイトル
     */
    description?: string;
    /**
     * クリックハンドラー
     */
    onClick?: () => void;
}