import { AgentColor, FillColor, IconMapping } from "./type";

export const INITIAL_VIEW_STATE = {
    target: [0, 0, 0],
    rotationX: 30,
    rotationOrbit: 0,
    minZoom: 0,
    maxZoom: 20,
    zoom: 0.5
};

export const AGENT_COLOR: AgentColor = {
    "POLICE_FORCE": [0, 0, 255],
    "FIRE_BRIGADE": [255, 0, 0],
    "AMBULANCE_TEAM": [255, 255, 255],
    "CIVILIAN": [0, 255, 0],
}

export const ICON_MAPPING: IconMapping = {
    marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
};

export const FILL_COLOR: FillColor = {
    Building: [200, 200, 200, 200],
    Refuge: [0, 255, 0, 255],
    Road: [136, 154, 182, 200],
    GasStation: [200, 200, 200, 200],
};

export const STEP_DULATION = 60;

export const BROKEN = {
    LEVEL_1: [161, 210, 230, 200],
    LEVEL_2: [125, 169, 117, 200],
    LEVEL_3: [206, 134, 52, 200],
    LEVEL_4: [213, 64, 43, 200],
    LEVEL_5: [79, 20, 19, 200],
}

// スコア
export const MAX = 10000;