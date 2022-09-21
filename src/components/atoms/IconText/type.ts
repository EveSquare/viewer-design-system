import { IconType } from "react-icons";
import { IconProps } from "@chakra-ui/icons";
import { ComponentWithAs } from "@chakra-ui/react";


export interface Props {
    /**
     * アイコンの種類
     */
    icon: IconType | ComponentWithAs<'svg', IconProps>;
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

