class normalizePosition {
  mapWidth: number;
  mapHeight: number;

  constructor(mapWidth: number, mapHeight: number) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
  }

  getX(v: number) {
    return (v - this.mapWidth / 2) / 1000;
  }

  getY(v: number) {
    return (v - this.mapHeight / 2) / 1000;
  }

};
export default normalizePosition;
