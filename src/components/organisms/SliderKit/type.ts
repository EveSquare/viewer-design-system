export interface Props {
    /**
     * ステータスアイコンの切り替え
     */
    isPlaying: boolean;
    /** 
     * 非活性状態
    */
    isDisabled: boolean;
    /**
     * 表示切り替え
     */
    isShowing: string;
    /**
     * スライダーの値
     */
    value: number;
    /**
     * スライダー最大値
     */
    max: number;
    /**
     * スライダー変更イベント
     */
    onChange: (v: number) => void;
    /**
     * スライダー終了イベント
     */
    onChangeEnd: () => void;
    /** 
     * 再生・停止クリックイベント
     */
    onClickPlayButton: () => void;
}

