class normalizePosition {

  constructor(mapWidth, mapHeight) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
  }

  getX(v) {
      return (v - this.mapWidth / 2) / 1000;
  }
  
  getY(v) {
    return (v - this.mapHeight / 2) / 1000;
  }

};
export default normalizePosition;
