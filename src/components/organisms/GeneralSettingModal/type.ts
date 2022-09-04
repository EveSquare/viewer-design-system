import { Dispatch, SetStateAction } from "react";

interface State {
    colorMode: string;
    headerVisibility: string;
    sideBarVisibility: string;
    charactorVisibility: string;
}

export interface Props {
    /**
     * モーダルの状態管理
     */
    isOpen: boolean;
    /** 
     * モーダルを開く
    */
    onOpen: () => void;
    /**
     * モーダルを閉じる
     */
    onClose: () => void;
    /**
     * モーダルのサイズ
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "full";
    /**
     * 設定の状態管理
     */
    state: State;
    /**
     * 設定の状態を変更する
     */
    setState: Dispatch<SetStateAction<State>>;
}

