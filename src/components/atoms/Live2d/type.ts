export interface Props {
    width: number;
    height: number;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    color?: string;

    ModelList?: string[];
    TouchBody?: string[];
    TouchHead?: string[];
    TouchDefault?: string[];
    PathFull?: string;
    MobileShow?: boolean;

    release?: boolean;
    menuList?: string[];
}