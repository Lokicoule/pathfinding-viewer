import { AlgorithmSelector } from "@ui/components/algorithm";
import { PATHFINDING_ALGORITHMS } from "../../../constants/pathfindingConstants";

const PathfindingAlgorithmSelector = () => (
  <AlgorithmSelector
    className="rounded-lg w-full  overflow-y-auto"
    title="Pathfinding Vizualizer"
    algorithms={PATHFINDING_ALGORITHMS}
  />
);

export default PathfindingAlgorithmSelector;
