import React from 'react';
import { ChildProps as ChildSliderArgsProps } from "@/components/organisms/SliderKit/type";

export interface Props {
    /**
     * 子要素
     */
    children: React.ReactNode;
    /**
     * スコアの状態
     */
    score: number;
    /**
     * 最大スコアの状態
     */
    maxScore: number;
}