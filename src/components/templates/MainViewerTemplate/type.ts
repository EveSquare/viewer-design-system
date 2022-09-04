import React from "react";
import { Props as HeaderProps } from "@/components/molecules/Header/type";
import { Props as SideBarProps } from "@/components/organisms/SideBar/type";

export interface Props {
    /**
     * 最背面に表示するコンポーネント
     */
    children: React.ReactNode;
    /**
     * サイドバーデータ
     */
    sideBarInfo: SideBarProps;
    /**
     * ヘッダーデータ
     */
    headerInfo: HeaderProps;
    /**
     * キャラクターの表示状態
     */
    characterIsShowing: string;
}

