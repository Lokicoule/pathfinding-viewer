import { useState } from "react";
import { PathfindingRunnerCommand } from "../../domain/commands/PathfindingRunnerCommand";
import {
  PathfindingAlgorithmType,
  mapStringToPathfindingAlgorithm,
} from "../../domain/types/PathfindingAlgorithmType";
import { useCommand } from "../adapters/mediator/hooks/useCommand";
import { useAlgorithm } from "../hooks/useAlgorithm";
import { PATHFINDING_ALGORITHMS } from "../constants/pathfindingConstants";

type PathfindingComponent = React.FC;

const Pathfinding: PathfindingComponent = () => {
  const { isAlgorithmRunning } = useAlgorithm();
  const [algorithm, setAlgorithm] = useState<PathfindingAlgorithmType>(
    PATHFINDING_ALGORITHMS.keys().next().value
  );
  const sendCommand = useCommand();

  const pathfindingAlgorithmMediator = (
    algorithm: PathfindingAlgorithmType
  ) => {
    sendCommand(
      PathfindingRunnerCommand.name,
      new PathfindingRunnerCommand(algorithm)
    );
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(mapStringToPathfindingAlgorithm(event.target.value));
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="pathfinding-algorithm" className="text-lg font-semibold">
        Pathfinding Algorithm
      </label>
      <div className="flex flex-row gap-4">
        <select
          disabled={isAlgorithmRunning}
          onChange={handleSelectChange}
          name="pathfinding-algorithm"
          className="p-2"
        >
          {Array.from(PATHFINDING_ALGORITHMS).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        <button
          disabled={isAlgorithmRunning}
          onClick={() => pathfindingAlgorithmMediator(algorithm)}
          className="text-white font-bold py-2 px-4 rounded-full"
        >
          Run
        </button>
      </div>
    </div>
  );
};

export default Pathfinding;
