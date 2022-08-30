import React from "react";
import { Props as AgentCardProps } from "@/components/molecules/AgentCard/type";
import { Props as LinkCardProps } from "@/components/molecules/LinkCard/type";
import { Props as HeaderProps } from "@/components/molecules/Header/type";

export interface Props {
    /**
     * 最背面に表示するコンポーネント
     */
    children: React.ReactNode;
    /** 
     * エージェントカードデータ
    */
    agentDatas: Array<AgentCardProps>;
    /**
     * リンクカードデータ
     */
    linkDatas: Array<LinkCardProps>;
    /**
     * ヘッダーデータ
     */
    headerInfo: HeaderProps;
}

