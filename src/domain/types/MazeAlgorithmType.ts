export type MazeAlgorithmType = "RECURSIVE_DIVISION" | "PRIMS" | "DFS";

export const MazeAlgorithmTypes: MazeAlgorithmType[] = [
  "RECURSIVE_DIVISION",
  "PRIMS",
  "DFS",
];

export const mapStringToMazeAlgorithm = (type: string): MazeAlgorithmType => {
  switch (type) {
    case "RECURSIVE_DIVISION":
    case "PRIMS":
    case "DFS":
      return type;
    default:
      throw new Error(`${type} is not a valid maze algorithm`);
  }
};
