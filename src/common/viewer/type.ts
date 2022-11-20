export interface Props {
    mapData: MapInfo
    rescueLogData: Record
    metaData: MetaData
}

export interface Record {
    // そのレコードのステップ番号
    time: number
    // このステップでのスコア
    score: number
    // すべてのEntityの情報
    world: World
    // 変更されたEntityの差分情報
    changes: Array<Entity>
    // 実行された行動や通信の情報
    commands: Array<Command>
    // そのシミュレーションで使われる地図情報
    map: MapInfo
    // そのシミュレーションで使われるコンフィグ
    config: Array<string>
}

export interface World {
    agents: Array<Entity>
    buildings: Array<Entity>
    roads: Array<Entity>
    blockades: Array<Entity>
}

export interface Entity {
    // EntityのID
    id: number
    // Entityの種類
    type: AllEntity
    // EntityのX座標
    x?: number | undefined
    // EntityのY座標
    y?: number | undefined
    // Entityの居るAreaのEntity ID
    position?: number | undefined
    // Entityが受けているダメージ
    damage?: number | undefined
    // Entityの埋没度
    buried?: number | undefined
    // EntityのHP(体力)
    hp?: number | undefined
    // Entityの移動経路(座標のリスト)
    history?: Array<Point> | undefined
    // Entityの移動距離
    travel?: number | undefined
    // 積載しているEntityのID(未実装)
    board?: number | undefined
    // 積載している水の総量
    water?: number | undefined
    // Entityの上にあるBlockadesのIDリスト
    blockades?: Array<number> | undefined
    // 建物の熱量
    temp?: number | undefined
    // 建物の倒壊度
    broken?: number | undefined
    // 建物の燃焼度
    fiery?: number | undefined
    // Blockadeの修繕コスト
    repairCost?: number | undefined
    // Blockadeの頂点情報(形状情報)
    apexes?: Apexes | undefined
}

/**
 * MAP
 */

export interface MapInfo {
    // 地図の幅
    width: number
    // 地図の高さ
    height: number
    // 地形(建物・道路)情報
    entities: Array<AreaInfo>
}

export interface AreaInfo {
    // この地形情報を持つEntityのID
    id: number
    // この地形情報の示す種類
    type: 'Building' | 'Road' | 'Refuge' | 'GasStation'
    // 地図上でのX座標
    x: number
    // 地図上でのY座標
    y: number
    // この地形の外形の辺リスト
    edges: Array<Edge>
    // この地形に隣り合う地形のEntityIDリスト
    neighbours: Array<number>
}

export interface Command {
    // この行動を起こしたEntityのID
    id: number
    // この行動の種類
    type: ALLCommandType
    // 移動経路
    path?: Array<number> | undefined
    // 移動先のX座標
    x?: number | undefined
    // 移動先のY座標
    y?: number | undefined
    // 通信チャンネル
    channel?: number | undefined
    // 行動対象のEntityID
    target?: number | undefined
    // 消火に使う水の量
    water?: number | undefined
    // 通信のバイト数
    messageSize?: number | undefined
}

/**
 * META
 */

export interface MetaData {
    /**
     * マップ名
     */
    mapName: string;
    /**
     * チーム名
     */
    tesmName: string;
    /**
     * 最大ステップ数
     */
    maxTimeStep: number;
    /**
     * スコア一覧
     */
    scores: number[];
}





export type AllEntity = "TacticsAmbulance"  // 救急隊
    | "TacticsFire"  // 消防隊
    | "TacticsPolice"  // 土木隊
    | "Civilian"  // 市民
    | "Building"  // 建物
    | "Refuge"  // 避難所
    | "ControlAmbulance"  // 救急本部
    | "ControlFire"  // 消防本部
    | "ControlPolice"  // 土木本部
    | "GasStation"  // ガソリンスタンド
    | "Road"  // 道路
    | "Hydrant"  // 給水栓
    | "Blockade" // ガレキ

export type ALLCommandType = "Move" //移動
    | "Rest" //待機
    | "Load" //移送開始
    | "Unload" //移送終了
    | "Rescue" //埋没救助
    | "Extinguish" //消火活動
    | "Clear" //ガレキ除去
    | "LClear" //ガレキ除去(レガシー)
    | "Radio" //無線伝達
    | "Voice" //口頭伝達
    | "Subscribe" //全体伝達
    | "Tell"//全体伝達

export interface Apexes {
    [key: number]: Point
}

export interface Point {
    x: number
    y: number
}

export interface Edge {
    start: Point
    end: Point
    adjacent?: number | undefined
}




export interface Animation {
    id: number
}

export interface ToolTipObject {
    object: Entity
}


/** 
 * 定数の型
*/

export interface AgentColor {
    [key: string]: number[];
}

export interface IconMapping {
    marker: { x: number; y: number; width: number; height: number; mask: boolean; };
}

export interface FillColor {
    Building: number[];
    Refuge: number[];
    Road: number[];
    GasStation: number[];
}