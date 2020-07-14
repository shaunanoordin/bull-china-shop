import { GRID_WIDTH, GRID_HEIGHT, TILE_SIZE } from './constants'
import Entity from './entity'

class App {
  constructor () {
    this.html = {
      console: document.getElementById("console"),
      canvas: document.getElementById("canvas"),
    }
    
    this.canvas2d = this.html.canvas.getContext('2d')
    this.canvasWidth = TILE_SIZE * GRID_WIDTH
    this.canvasHeight = TILE_SIZE * GRID_HEIGHT
    
    this.html.canvas.width = this.canvasWidth
    this.html.canvas.height = this.canvasHeight
    this.html.canvas.addEventListener('pointerdown', this.onPointerDown.bind(this))
    
    this.ready = false
    this.assets = {
      // ...
    }
    
    this.player = null
    this.entities = []

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
  }
  
  paint () {
    const c2d = this.canvas2d
    
    c2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    
    c2d.strokeStyle = 'rgba(128, 128, 128, 0.5)'
    
    for (let row = 0 ; row < GRID_HEIGHT ; row ++) {
      for (let col = 0 ; col < GRID_WIDTH ; col ++) {
        c2d.beginPath()
        c2d.rect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
        c2d.stroke()
      }
    }
    
    this.entities.forEach(entity => entity.paint())
  }
  
  onPointerDown (e) {
    const coords = getEventCoords(e, this.html.canvas)
    console.log(coords)
    
    stopEvent(e)
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