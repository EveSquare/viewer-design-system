import { Props as AgentCardProps } from "@/components/molecules/AgentCard/type";
import { Props as LinkCardProps } from "@/components/molecules/LinkCard/type";

export interface Props {
    /**
     * エージェントカードデータ
     */
    agentDatas: Array<AgentCardProps>;
    /**
     * リンクカードデータ
     */
    linkDatas: Array<LinkCardProps>;
    /**
     * 表示状態
     */
    isShowing: string;
}