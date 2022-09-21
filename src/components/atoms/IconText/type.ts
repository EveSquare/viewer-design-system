import { IconType } from "react-icons";


export interface Props {
    /**
     * アイコンの種類
     */
    icon: IconType;
    /**
     * 表示するテキスト
     */
    text: string;
    /**
     * テキストのサイズ
     */
    fontSize?: string;
    /**
     * テキストとアイコンの間隔
     */
    textMarginLeft?: number | string;
    /**
     * アイコンのサイズ　縦・横ともに同じサイズとなる
     */
    iconSize?: number | string;
    /**
     * リンク
     */
    href?: string;
}

