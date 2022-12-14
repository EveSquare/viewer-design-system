import React from "react";
import { Props } from './type'
import ReactLive2d from 'react-live2d';

export const Live2d: React.FC<Props> = (props) => {
    return (
        <>
            <ReactLive2d
                {...props}
            />
        </>
    );
}

Live2d.displayName = "LIVE2D";