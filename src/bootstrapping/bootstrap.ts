import { GRID_WIDTH, NODE_PIXEL_SIZE } from "../shared/constants";
import { CompositionRoot } from "./CompositionRoot";
import { calculateGridDimensions } from "./utils/calculateGridDimensions";

const { numCols, numRows } = calculateGridDimensions(
  NODE_PIXEL_SIZE,
  GRID_WIDTH,
  70
);

export const compositionRoot = CompositionRoot.create(numCols, numRows);
