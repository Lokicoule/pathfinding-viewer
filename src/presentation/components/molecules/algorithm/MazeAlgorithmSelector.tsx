import { MAZE_ALGORITHMS } from "../../../constants/mazeConstants";
import AlgorithmSelector from "./AlgorithmSelector";

const MazeAlgorithmSelector = () => (
  <AlgorithmSelector title="Maze Generation" algorithms={MAZE_ALGORITHMS} />
);

export default MazeAlgorithmSelector;
