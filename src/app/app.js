const TILE_SIZE = 32
const GRID_WIDTH = 16
const GRID_HEIGHT = 5


class App {
  constructor () {
    this.html = {
      console: document.getElementById("console"),
      canvas: document.getElementById("canvas"),
    }
    
    this.html.canvas.width = TILE_SIZE * GRID_WIDTH
    this.html.canvas.height = TILE_SIZE * GRID_HEIGHT
    
    this.html.canvas.addEventListener('pointerdown', this.onPointerDown.bind(this))
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