import { useState } from "react";
import { SetAlgorithmCommand } from "../../../../domain/commands/SetAlgorithmCommand";
import {
  PathfindingAlgorithmType,
  mapStringToPathfindingAlgorithm,
} from "../../../../domain/types/PathfindingAlgorithmType";
import { useCommand } from "../../../adapters/mediator/hooks/useCommand";
import { PATHFINDING_ALGORITHMS } from "../../../constants/pathfindingConstants";
import { useAlgorithm } from "../../../hooks/useAlgorithm";

type PathfindingComponent = React.FC;

const Pathfinding: PathfindingComponent = () => {
  const { isAlgorithmRunning } = useAlgorithm();
  const [algorithm, setAlgorithm] = useState<PathfindingAlgorithmType>(
    PATHFINDING_ALGORITHMS.keys().next().value
  );
  const sendCommand = useCommand();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(mapStringToPathfindingAlgorithm(event.target.value));
    sendCommand(SetAlgorithmCommand.name, new SetAlgorithmCommand(algorithm));
  };

  return (
    <div className="flex flex-col">
      <p className="text-lg font-semibold text-white">Pathfinding Algorithm</p>
      <div className="flex flex-row gap-4">
        <select
          disabled={isAlgorithmRunning}
          onChange={handleSelectChange}
          className="p-2"
        >
          {Array.from(PATHFINDING_ALGORITHMS).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pathfinding;
