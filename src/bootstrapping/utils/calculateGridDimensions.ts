export const calculateGridDimensions = (
  cellSize = 30,
  percentWidth = 80,
  percentHeight = 80
) => {
  if (cellSize <= 0) {
    throw new Error("cellSize must be greater than 0");
  }

  if (percentWidth <= 0 || percentWidth > 100) {
    throw new Error("percentWidth must be greater than 0 and less than 100");
  }

  if (percentHeight <= 0 || percentHeight > 100) {
    throw new Error("percentHeight must be greater than 0 and less than 100");
  }

  if (window === undefined) {
    throw new Error("window is undefined");
  }

  const fullWidth = window.innerWidth;
  const fullHeight = window.innerHeight;

  const numCols = Math.floor(((percentWidth / 100) * fullWidth) / cellSize);
  const numRows = Math.floor(((percentHeight / 100) * fullHeight) / cellSize);

  return { numCols, numRows };
};
