import { CompositionRoot } from "./CompositionRoot";
import { calculateGridDimensions } from "./utils/calculateGridDimensions";

const cellSize = 30;

const { numCols, numRows } = calculateGridDimensions(cellSize);

export const compositionRoot = CompositionRoot.create(
  numCols,
  numRows,
  cellSize
);
