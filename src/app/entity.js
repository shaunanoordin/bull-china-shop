import { TILE_SIZE, ROTATIONS, DIRECTIONS, SHAPES } from './constants'

class Entity {
  constructor (app) {
    this._app = app
    
    this.x = 0
    this.y = 0
    this._rotation = ROTATIONS.SOUTH;  // Rotation in radians
    
    this.size = TILE_SIZE
    
    
    // Movement: self locomotion and external (pushed) movement.
    this.moveX = 0
    this.moveY = 0
    this.pushX = 0
    this.pushY = 0
    
    this.shape = SHAPES.NONE
    this.shapePolygonPath = null  // Only applicable if shape === SHAPES.POLYGON
    this.solid = false
    this.movable = false
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
  
  onCollision (target, collisionCorrection) {
    console.log('BONK')
  }
}

export default Entity;