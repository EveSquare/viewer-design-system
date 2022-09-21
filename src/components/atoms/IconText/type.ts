import { IconType } from "react-icons";


export interface Props {
    icon: IconType;
    text: string;
    iconSize: number | string;
    fontSize: string;
    textMarginLeft: number | string;
    href?: string;
}

