import { LAppDelegate } from './lappdelegate';
import { LAppLive2DManager } from './lapplive2dmanager';
import * as LAppDefine from './lappdefine';
import React, { useState, useEffect } from 'react';
import './asset/index.css'

function ReactLive2d(props) {

    // 好看颜色列表
    // green: '#B4DEAE',
    // DeepBlue: '#5B8DBE',
    // LightBlue: '#C8E6FE',
    // pink: '#F9B8BE'

    const width = props.width ? props.width : '300';
    const height = props.height ? props.height : '500';
    const top = props.top ? props.top : '';
    const right = props.right ? props.right : '0';
    const bottom = props.bottom ? props.bottom : '0';
    const left = props.left ? props.left : '';

    const sizing = {
        top: top,
        right: right,
        bottom: bottom,
        left: left,
    }

    // 容器样式
    let containerStyle = {
        position: 'fixed',
        width: width,
        height: height,
        ...sizing
    }
    // canvas样式
    let canvasStyle = {
        position: 'fixed',
        zIndex: 2,
        ...sizing
    }

    useEffect(() => {
        props.ModelList ? LAppDefine.lappdefineSet.setModelDir(props.ModelList) : LAppDefine.lappdefineSet.setModelDir([])

        if (!navigator.userAgent.match(/mobile/i) || props.MobileShow == true) {

            if (LAppDelegate.getInstance().initialize() == false) {
                return;
            }

            LAppDelegate.getInstance().run();
            // window.onbeforeunload = () => LAppDelegate.releaseInstance();
        };

        window.addEventListener("live2dOnTap", (event) => {
            const s_instance = LAppLive2DManager.getInstance();
            s_instance.onTap(event.detail.x || 0, event.detail.y || 0);
        })

    }, []);

    useEffect(() => {
        if (props.release == true) {
            LAppDelegate.releaseInstance();
        }
    }, [props.release]);

    return (
        <div>
            <div
                style={containerStyle}
                id="live2d-container"
            >
                <div id="live2d-hidden"
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        zIndex: '2'
                    }}
                >

                </div>
                <canvas
                    id="live2d"
                    style={canvasStyle}
                    width={width}
                    height={height}
                    className="live2d"
                ></canvas>
            </div>
        </div>
    )
}

export default ReactLive2d