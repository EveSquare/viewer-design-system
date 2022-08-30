import React from "react";

export interface Props {
    /**
     * テキストの前に表示されるアイコン
     */
    prependIcon?: React.ReactNode;
    /**
     * 中央に表示されるテキスト
     */
    title: string;
    /**
     * リンク
     */
    href: string;
}