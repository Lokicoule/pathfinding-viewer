import { AlgorithmSelector } from "@ui/components/algorithm";
import { MAZE_ALGORITHMS } from "../../../constants/mazeConstants";

const MazeAlgorithmSelector = () => (
  <AlgorithmSelector
    className="rounded-lg w-full overflow-y-auto"
    title="Maze Generation"
    algorithms={MAZE_ALGORITHMS}
  />
);

export default MazeAlgorithmSelector;
