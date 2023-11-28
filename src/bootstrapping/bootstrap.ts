import {
  HEIGHT_PER_WINDOW_HEIGHT,
  NODE_PIXEL_SIZE,
  WIDTH_PER_WINDOW_WIDTH,
} from "../shared/constants";
import { CompositionRoot } from "./CompositionRoot";
import { calculateGridDimensions } from "./utils/calculateGridDimensions";

const { numCols, numRows } = calculateGridDimensions(
  NODE_PIXEL_SIZE,
  WIDTH_PER_WINDOW_WIDTH,
  HEIGHT_PER_WINDOW_HEIGHT
);

export const compositionRoot = CompositionRoot.create(numCols, numRows);
