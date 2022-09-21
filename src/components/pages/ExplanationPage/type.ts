import React from 'react';
import { Props as IconTextType } from '@/components/atoms/IconText/type';
import { Props as SectionProps } from '@/components/atoms/Section/type';

export interface Props {
    /**
     * サイドバーの情報
     */
    sideBarInfo: Array<SideBarInfo>;
    /**
     * サイドバーの選択状態を変更するための一意のキー
     */
    pageKey: string;
    /**
     * 説明を表示するコンポーネント
     */
    children: React.ReactNode;
}

interface SideBarInfo extends IconTextType {
    key: string;
    sections: Array<Section>;
}

interface Section extends SectionProps {
    key: string;
}