export const TILE_SIZE = 64
export const GRID_WIDTH = 24
export const GRID_HEIGHT = 16

export const SHAPES = {
  NONE: 'none',
  CIRCLE: 'circle',
  SQUARE: 'square',
  POLYGON: 'polygon',
}

export const ROTATIONS = {
  EAST: 0,
  SOUTHEAST: Math.PI * 0.25,
  SOUTH: Math.PI * 0.5,
  SOUTHWEST: Math.PI * 0.75,
  WEST: Math.PI,
  NORTHWEST: Math.PI * -0.75,
  NORTH: Math.PI * -0.5,
  NORTHEAST: Math.PI * -0.25,
}

export const DIRECTIONS = {
  EAST: 0,
  SOUTH: 1,
  WEST: 2,
  NORTH: 3,
}