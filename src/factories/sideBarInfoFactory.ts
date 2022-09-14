import { agentDatas } from "./agentDatasFactory";
import { linkDatas } from "./linkDatasFactory";
import { Props as SideBarProps } from "@/components/organisms/SideBar/type";

export const sideBarInfo: SideBarProps = {
    agentDatas: agentDatas,
    linkDatas: linkDatas,
    isShowing: "show",
}