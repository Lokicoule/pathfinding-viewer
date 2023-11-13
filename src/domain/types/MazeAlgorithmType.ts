export type MazeAlgorithmType =
  | "MAZE_RECURSIVE_DIVISION"
  | "MAZE_PRIMS"
  | "MAZE_DFS";

export const mapStringToMazeAlgorithm = (type: string): MazeAlgorithmType => {
  switch (type) {
    case "MAZE_RECURSIVE_DIVISION":
    case "MAZE_PRIMS":
    case "MAZE_DFS":
      return type;
    default:
      throw new Error(`${type} is not a valid maze algorithm`);
  }
};
