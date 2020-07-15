import { GRID_WIDTH, GRID_HEIGHT, TILE_SIZE, EXPECTED_TIMESTEP, MODES } from './constants'
import Entity from './entity'

class App {
  constructor () {
    this.html = {
      console: document.getElementById("console"),
      canvas: document.getElementById("canvas"),
    }
    
    this.mode = MODES.INITIALISING
    
    this.canvas2d = this.html.canvas.getContext('2d')
    this.canvasWidth = TILE_SIZE * GRID_WIDTH
    this.canvasHeight = TILE_SIZE * GRID_HEIGHT
    
    this.html.canvas.width = this.canvasWidth
    this.html.canvas.height = this.canvasHeight
    
    this.html.canvas.addEventListener('pointerdown', this.onPointerDown.bind(this))
    this.html.canvas.addEventListener('pointermove', this.onPointerMove.bind(this))
    this.html.canvas.addEventListener('pointerup', this.onPointerUp.bind(this))
    this.html.canvas.addEventListener('pointercancel', this.onPointerUp.bind(this))
    
    // Prevent "touch and hold to open context menu" interaction on touchscreens.
    this.html.canvas.addEventListener('touchstart', stopEvent)
    this.html.canvas.addEventListener('touchmove', stopEvent)
    this.html.canvas.addEventListener('touchend', stopEvent)
    this.html.canvas.addEventListener('touchcancel', stopEvent)
    
    this.ready = false
    this.assets = {
      // ...
    }
    
    this.player = null
    this.entities = []
    
    this.playerInput = {
      pointerStart: undefined,
      pointerCurrent: undefined,
      pointerEnd: undefined,
    }

    this.prevTime = null
    this.nextFrame = window.requestAnimationFrame(this.main.bind(this))
  }
  
  initialisationCheck () {
    // Assets check
    let allAssetsLoaded = true
    let numLoadedAssets = 0
    let numTotalAssets = 0
    Object.keys(this.assets).forEach((id) => {
      const asset = this.assets[id]
      allAssetsLoaded = allAssetsLoaded && asset.loaded
      if (asset.loaded) numLoadedAssets++
      numTotalAssets++
    })
    
    // Paint status
    this.canvas2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.canvas2d.textAlign = 'start'
    this.canvas2d.textBaseline = 'top'
    this.canvas2d.fillStyle = '#ccc'
    this.canvas2d.font = `1em monospace`
    this.canvas2d.fillText(`Loading ${numLoadedAssets} / ${numTotalAssets} `, TILE_SIZE, TILE_SIZE)
    
    if (allAssetsLoaded) {
      this.ready = true
      this.loadLevel(0)
    }
  }
  
  resetLevel () {
    this.mode = MODES.ACTION_IDLE
    this.player = undefined
    this.entities = []
  }
  
  loadLevel (level = 0) {
    this.resetLevel()
    
    this.player = new Entity(this)
    this.player.x = TILE_SIZE * GRID_WIDTH / 2
    this.player.y = TILE_SIZE * GRID_HEIGHT / 2
    this.entities.push(this.player)
    
  }
  
  main (time) {
    const timeStep = (this.prevTime) ? time - this.prevTime : time
    this.prevTime = time
    
    if (this.ready) {
      this.play(timeStep)
      this.paint()
    } else {
      this.initialisationCheck()
    }
    
    this.nextFrame = window.requestAnimationFrame(this.main.bind(this))
  }
  
  play (timeStep) {
    this.entities.forEach(entity => entity.play())
    
    this.processPhysics(timeStep)
  }
  
  paint () {
    const c2d = this.canvas2d
    
    c2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    
    c2d.strokeStyle = 'rgba(128, 128, 128, 0.5)'
    c2d.lineWidth = 1
    
    // Draw grid
    for (let row = 0 ; row < GRID_HEIGHT ; row ++) {
      for (let col = 0 ; col < GRID_WIDTH ; col ++) {
        c2d.beginPath()
        c2d.rect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
        c2d.stroke()
      }
    }
    
    // Draw entities
    this.entities.forEach(entity => entity.paint())
    
    // Draw player input
    if (this.mode === MODES.ACTION_PLAYER_INTERACTING
        && this.player
        && this.playerInput.pointerCurrent
       ) {
      
      const coords = this.playerInput.pointerCurrent
      
      c2d.strokeStyle = '#888'
      c2d.lineWidth = TILE_SIZE / 8
      
      c2d.beginPath()
      c2d.moveTo(this.player.x, this.player.y)
      c2d.lineTo(coords.x, coords.y)
      c2d.arc(coords.x, coords.y, this.size / 2, 0, 2 * Math.PI);
      c2d.stroke()

      const arrowCoords = {
        x: this.player.x - (coords.x - this.player.x),
        y: this.player.y - (coords.y - this.player.y),
      }
      c2d.strokeStyle = '#e42'
      c2d.lineWidth = TILE_SIZE / 8
      
      c2d.beginPath()
      c2d.moveTo(this.player.x, this.player.y)
      c2d.lineTo(arrowCoords.x, arrowCoords.y)
      c2d.stroke()
    }
  }
  
  onPointerDown (e) {
    const coords = getEventCoords(e, this.html.canvas)
    
    this.playerInput.pointerStart = undefined
    this.playerInput.pointerCurrent = undefined
    this.playerInput.pointerEnd = undefined
    
    if (this.player) {
      const distX = this.player.x - coords.x
      const distY = this.player.y - coords.y
      const distFromPlayer = Math.sqrt(distX * distX + distY + distY)
      const rotation = Math.atan2(distY, distX)
      
      const ACCEPTABLE_INPUT_DISTANCE_FROM_PLAYER_ENTITY = TILE_SIZE
      if (distFromPlayer < ACCEPTABLE_INPUT_DISTANCE_FROM_PLAYER_ENTITY) {
        this.mode = MODES.ACTION_PLAYER_INTERACTING
        this.playerInput.pointerStart = coords
        this.playerInput.pointerCurrent = coords
      }
    }
    
    return stopEvent(e)
  }
  
  onPointerMove (e) {
    const coords = getEventCoords(e, this.html.canvas)
    this.playerInput.pointerCurrent = coords
    
    if (this.mode === MODES.ACTION_PLAYER_INTERACTING) {
      // ...
    }
    
    return stopEvent(e)
  }
  
  onPointerUp (e) {
    const coords = getEventCoords(e, this.html.canvas)
    
    if (this.mode === MODES.ACTION_PLAYER_INTERACTING) {
      this.playerInput.pointerEnd = coords
      // this.mode = MODES.ACTION_MOVEMENT
      this.mode = MODES.ACTION_IDLE
      this.shoot()
    }
    
    return stopEvent(e)
  }
  
  shoot () {
    
  }
  
  processPhysics (timeStep) {
    const timeCorrection = (timeStep / EXPECTED_TIMESTEP)
    
    // Move Actors and Particles
    this.entities.forEach(entity => {
      entity.x += entity.moveX * timeCorrection
      entity.y += entity.moveY * timeCorrection
    })
    
    for (let a = 0; a < this.entities.length; a++) {
      let entityA = this.entities[a]
      
      for (let b = a + 1; b < this.entities.length; b++) {
        let entityB = this.entities[b]
        let collisionCorrection = Physics.checkCollision(entityA, entityB)
                
        if (collisionCorrection) {
          entityA.x = collisionCorrection.ax;
          entityA.y = collisionCorrection.ay;
          entityB.x = collisionCorrection.bx;
          entityB.y = collisionCorrection.by;
          entityA.onCollision(entityB, collisionCorrection);
          entityB.onCollision(entityA, collisionCorrection);
        }
      }
    }  
  }
}

function getEventCoords (event, element) {
  const xRatio = (element.width && element.offsetWidth) ? element.width / element.offsetWidth : 1
  const yRatio = (element.height && element.offsetHeight) ? element.height / element.offsetHeight : 1
  
  const x = event.offsetX * xRatio
  const y = event.offsetY * yRatio
  return { x, y }
}

function stopEvent (e) {
  if (!e) return false
  e.preventDefault && e.preventDefault()
  e.stopPropagation && e.stopPropagation()
  e.returnValue = false
  e.cancelBubble = true
  return false
}

export default App