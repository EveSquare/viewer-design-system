import react from "react";

export interface Props {
    children: react.ReactNode;
    onResetAction: () => void;
    onZoomInAction: () => void;
    onZoomOutAction: () => void;
}