import { PATHFINDING_ALGORITHMS } from "../../../constants/pathfindingConstants";
import AlgorithmSelector from "./AlgorithmSelector";

const PathfindingAlgorithmSelector = () => (
  <AlgorithmSelector
    className="rounded-lg w-full  overflow-y-auto"
    title="Pathfinding Vizualizer"
    algorithms={PATHFINDING_ALGORITHMS}
  />
);

export default PathfindingAlgorithmSelector;
