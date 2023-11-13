import { NODE_PIXEL_SIZE } from "../shared/constants";
import { CompositionRoot } from "./CompositionRoot";
import { calculateGridDimensions } from "./utils/calculateGridDimensions";

// grid card width and height are 3/4 of the viewport width and height
// that's why we pass 75 as the second and third argument
const { numCols, numRows } = calculateGridDimensions(NODE_PIXEL_SIZE, 75, 75);

export const compositionRoot = CompositionRoot.create(numCols, numRows);
