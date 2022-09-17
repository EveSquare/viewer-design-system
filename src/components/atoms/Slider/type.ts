export interface Props {
    /**
     * 下限値
     * @default 0
     */
    min?: number;
    /**
     * 上限値
     */
    max: number;
    /**
     * 非活性状態
     * @default false
     */
    isDisabled?: boolean;
    /**
     * スライダーの値
     */
    value: number;
    /**
     * スライダーの値が変更された際に発火するイベント
     */
    onChange: (value: number) => void;
    /**
     * スライダーを終了したとき(離した時)に発火するイベント
     */
    onChangeEnd: (value: number) => void;
}

