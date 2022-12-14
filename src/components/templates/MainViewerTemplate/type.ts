import React from "react";
import { Props as HeaderProps } from "@/components/organisms/Header/type";
import { Props as SideBarProps } from "@/components/organisms/SideBar/type";
import { Props as SliderProps } from "@/components/organisms/SliderKit/type";

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
    /**
     * スライダーの状態
     */
    sliderArgs: SliderProps;
}

