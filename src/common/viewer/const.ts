import { AgentColor, FillColor, IconMapping } from "./type";

export const LOG_BASE_PATH = "/Resources/logs/sample-logs/6";

export const INITIAL_VIEW_STATE = {
    target: [0, 0, 0],
    rotationX: 30,
    rotationOrbit: 0,
    minZoom: 0,
    maxZoom: 20,
    zoom: 0.5
};

export const AGENT_COLOR: AgentColor = {
    "TacticsPolice": [0, 0, 255],
    "TacticsFire": [255, 0, 0],
    "TacticsAmbulance": [255, 255, 255],
    "Civilian": [0, 255, 0],
}

export const ICON_MAPPING: IconMapping = {
    marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
};

export const FILL_COLOR: FillColor = {
    Building: [200, 200, 200, 200],
    Refuge: [0, 200, 0, 200],
    GasStation: [200, 200, 200, 200],
};