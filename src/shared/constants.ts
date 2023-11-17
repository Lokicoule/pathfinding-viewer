const SMALL_SCREEN_NODE_PIXEL_SIZE = 15;
const MEDIUM_SCREEN_NODE_PIXEL_SIZE = 20;
const LARGE_SCREEN_NODE_PIXEL_SIZE = 30;

const screenWidth = window.innerWidth;

let nodePixelSize;

if (screenWidth < 600) {
  nodePixelSize = SMALL_SCREEN_NODE_PIXEL_SIZE;
} else if (screenWidth < 900) {
  nodePixelSize = MEDIUM_SCREEN_NODE_PIXEL_SIZE;
} else {
  nodePixelSize = LARGE_SCREEN_NODE_PIXEL_SIZE;
}

export const NODE_PIXEL_SIZE = nodePixelSize;

export const SIDEBAR_WIDTH = 380;
export const DELTA_SENSITIVITY = 0.25;

export const SIDEBAR_MIN_WIDTH = 250;
export const SIDEBAR_MAX_WIDTH = 500;
