export interface Props {
    /**
     * STEP数
     */
    stepCount: number;
    /**
     * STEP数 ツールチップ
     */
    stepTooltip?: string;
    /**
     * SCORE
     */
    score: number;
    /**
     * ヘッダ右側のテキスト ツールチップ
     */
    scoreTooltip?: string;
    /**
     * 表示状態
     */
    isShowing: string;
    /**
     * 設定ボタン押下時のコールバック
     */
    onOpenSetting: () => void;
}