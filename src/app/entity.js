import { TILE_SIZE } from './constants'

class Entity {
  constructor (app) {
    this._app = app
    
    this.x = 0
    this.y = 0
    
    this.size = TILE_SIZE
    
    
  }
  
  play () {
    
  }
  
  paint () {
    const c2d = this._app.canvas2d
    
    c2d.beginPath();
    c2d.fillStyle = '#c44'
    c2d.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI);
    c2d.fill()
  }
  
}

export default Entity;