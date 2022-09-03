"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lappdelegate = require("./lappdelegate");

var _lapplive2dmanager = require("./lapplive2dmanager");

var LAppDefine = _interopRequireWildcard(require("./lappdefine"));

var _react = _interopRequireWildcard(require("react"));

require("./asset/index.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ReactLive2d(props) {
  // 好看颜色列表
  // green: '#B4DEAE',
  // DeepBlue: '#5B8DBE',
  // LightBlue: '#C8E6FE',
  // pink: '#F9B8BE'
  var width = props.width ? props.width : '300';
  var height = props.height ? props.height : '500'; // 容器样式

  var containerStyle = {
    position: 'fixed',
    top: props.top ? props.top : '',
    right: props.right ? props.right : '0',
    bottom: props.bottom ? props.bottom : '0',
    left: props.left ? props.left : '',
    width: width
  }; // canvas样式

  var canvasStyle = {
    position: 'relative',
    top: props.top ? props.top : '',
    right: props.right ? props.right : '0',
    bottom: props.bottom ? props.bottom : '0',
    left: props.left ? props.left : '',
    height: height
  }; // 面板主题样式
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

  (0, _react.useEffect)(function () {
    props.ModelList ? LAppDefine.lappdefineSet.setModelDir(props.ModelList) : LAppDefine.lappdefineSet.setModelDir([]); // props.TouchBody ? LAppDefine.lappdefineSet.setHitBody(props.TouchBody) : LAppDefine.lappdefineSet.setHitBody([])
    // props.TouchHead ? LAppDefine.lappdefineSet.setHitHead(props.TouchHead) : LAppDefine.lappdefineSet.setHitHead([])
    // props.TouchDefault ? LAppDefine.lappdefineSet.setHitDefault(props.TouchDefault) : LAppDefine.lappdefineSet.setHitDefault([])
    // props.PathFull ? LAppDefine.lappdefineSet.setPathFull(props.PathFull) : LAppDefine.lappdefineSet.setPathFull('')

    if (!navigator.userAgent.match(/mobile/i) || props.MobileShow == true) {
      if (_lappdelegate.LAppDelegate.getInstance().initialize() == false) {
        return;
      }

      _lappdelegate.LAppDelegate.getInstance().run(); // window.onbeforeunload = () => LAppDelegate.releaseInstance();

    }

    ;
    window.addEventListener("live2dOnTap", function (event) {
      var s_instance = _lapplive2dmanager.LAppLive2DManager.getInstance();

      s_instance.onTap(event.detail.x || 0, event.detail.y || 0);
    });
  }, []);
  (0, _react.useEffect)(function () {
    if (props.release == true) {
      _lappdelegate.LAppDelegate.releaseInstance();
    }
  }, [props.release]);
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    style: containerStyle,
    id: "live2d-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    id: "live2d-hidden",
    style: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '2'
    }
  }), /*#__PURE__*/_react["default"].createElement("canvas", {
    id: "live2d",
    style: canvasStyle,
    width: width,
    height: height,
    className: "live2d" // onMouseEnter={cvMouseOver}
    // onMouseLeave={cvMouseOut}

  })));
}

var _default = ReactLive2d;
exports["default"] = _default;