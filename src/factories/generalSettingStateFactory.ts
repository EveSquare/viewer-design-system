import { State } from "@/components/organisms/GeneralSettingModal/type";
import { isMobile } from "react-device-detect";

export const generalSettingState: State = {
    colorMode: "dark",
    headerVisibility: "show",
    sideBarVisibility: isMobile ? "hide" : "show", //モバイル端末ではサイドバーを初期値で非表示とする
    characterVisibility: "show",
    sliderKitVisibility: "show",
}