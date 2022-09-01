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

    // 容器样式
    let containerStyle = {
        position: 'fixed',
        top: props.top ? props.top : '',
        right: props.right ? props.right : '0',
        bottom: props.bottom ? props.bottom : '0',
        left: props.left ? props.left : ''
    }
    // canvas样式
    let canvasStyle = {
        position: 'relative',
        top: props.top ? props.top : '',
        right: props.right ? props.right : '0',
        bottom: props.bottom ? props.bottom : '0',
        left: props.left ? props.left : ''
    }

    // 面板主题样式
    // let Theme = {
    //     color: props.color ? props.color : '#C8E6FE',
    //     width: '30px',
    //     height: '30px',
    // }

    // let timer = null;

    // const [controllerOn, setControllerOn] = useState(false)

    // const [controllerIn, setControllerIn] = useState(false)

    // const [printMenu, setPrintMenu] = useState(false)

    // 进入显示控制台
    // function cvMouseOver() {
    //     setControllerOn(true)
    // }

    // function cvMouseOut() {
    //     timer = setTimeout(() => {
    //         // 0.01秒内没有进入点击面板，说明已经鼠标离开
    //         if (!controllerIn) {
    //             setControllerOn(false)
    //             setControllerIn(false)
    //         }
    //     }, 10);
    // }

    useEffect(() => {
        props.ModelList ? LAppDefine.lappdefineSet.setModelDir(props.ModelList) : LAppDefine.lappdefineSet.setModelDir([])
        props.TouchBody ? LAppDefine.lappdefineSet.setHitBody(props.TouchBody) : LAppDefine.lappdefineSet.setHitBody([])
        props.TouchHead ? LAppDefine.lappdefineSet.setHitHead(props.TouchHead) : LAppDefine.lappdefineSet.setHitHead([])
        props.TouchDefault ? LAppDefine.lappdefineSet.setHitDefault(props.TouchDefault) : LAppDefine.lappdefineSet.setHitDefault([])
        props.PathFull ? LAppDefine.lappdefineSet.setPathFull(props.PathFull) : LAppDefine.lappdefineSet.setPathFull('')

        if (!navigator.userAgent.match(/mobile/i) || props.MobileShow == true) {

            if (LAppDelegate.getInstance().initialize() == false) {
                return;
            }

            LAppDelegate.getInstance().run();
            // window.onbeforeunload = () => LAppDelegate.releaseInstance();
        }

    }, []);

    useEffect(() => {
        if (props.release == true) {
            LAppDelegate.releaseInstance();
        }
    }, [props.release])

    return (
        <div>
            <div
                style={containerStyle}
                width={props.width ? props.width : '300'}
                height={props.height ? props.height : '500'}
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
                    width={props.width ? props.width : '300'}
                    height={props.height ? props.height : '500'}
                    className="live2d"
                // onMouseEnter={cvMouseOver}
                // onMouseLeave={cvMouseOut}
                ></canvas>
            </div>
        </div>
    )
}

export default ReactLive2d