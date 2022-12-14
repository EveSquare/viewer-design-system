import { Props as HeaderProps } from "@/components/organisms/Header/type";
import { action } from "@storybook/addon-actions";

export const headerInfo: HeaderProps = {
    stepCount: 10,
    stepTooltip: 'ここには、ステップ数が表示されます',
    score: 100,
    maxScore: 300,
    scoreTooltip: 'ここには、スコアが表示されます',
    onOpenSetting: action("onOpenSettingClicked"),
    isShowing: "show",
}