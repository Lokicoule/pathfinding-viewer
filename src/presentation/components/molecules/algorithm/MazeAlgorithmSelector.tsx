import { mapStringToMazeAlgorithm } from "../../../../domain/types/MazeAlgorithmType";
import { MAZE_ALGORITHMS } from "../../../constants/mazeConstants";
import AlgorithmSelector from "./AlgorithmSelector";

const MazeAlgorithmSelector = () => (
  <AlgorithmSelector
    algorithmType="Maze Algorithm"
    mapStringToAlgorithm={mapStringToMazeAlgorithm}
    algorithms={MAZE_ALGORITHMS}
  />
);

export default MazeAlgorithmSelector;
