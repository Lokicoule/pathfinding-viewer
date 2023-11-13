import { NODE_PIXEL_SIZE } from "../shared/constants";
import { CompositionRoot } from "./CompositionRoot";
import { calculateGridDimensions } from "./utils/calculateGridDimensions";

const { numCols, numRows } = calculateGridDimensions(NODE_PIXEL_SIZE, 75, 65);

export const compositionRoot = CompositionRoot.create(numCols, numRows);
