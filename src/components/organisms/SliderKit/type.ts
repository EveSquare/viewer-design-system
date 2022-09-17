export interface ChildProps {
    /**
     * ステータスアイコンの切り替え
     */
    isPlaying: boolean;
    /** 
     * 非活性状態
    */
    isDisabled: boolean;
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
    onChangeEnd: (v: number) => void;
    /** 
     * 再生・停止クリックイベント
     */
    onClickPlayButton: () => void;
}

export interface Props extends ChildProps {
    /**
     * 表示切り替え
     */
    isShowing: string;
}

