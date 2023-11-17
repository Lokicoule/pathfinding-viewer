import { mapStringToPathfindingAlgorithm } from "../../../../domain/types/PathfindingAlgorithmType";
import { PATHFINDING_ALGORITHMS } from "../../../constants/pathfindingConstants";
import AlgorithmSelector from "./AlgorithmSelector";

const PathfindingAlgorithmSelector = () => (
  <AlgorithmSelector
    algorithmType="Pathfinding Algorithm"
    mapStringToAlgorithm={mapStringToPathfindingAlgorithm}
    algorithms={PATHFINDING_ALGORITHMS}
  />
);

export default PathfindingAlgorithmSelector;
