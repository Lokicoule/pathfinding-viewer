import { PATHFINDING_ALGORITHMS } from "../../../constants/pathfindingConstants";
import AlgorithmSelector from "./AlgorithmSelector";

const PathfindingAlgorithmSelector = () => (
  <AlgorithmSelector
    title="Pathfinding Vizualizer"
    algorithms={PATHFINDING_ALGORITHMS}
  />
);

export default PathfindingAlgorithmSelector;
