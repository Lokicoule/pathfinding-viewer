import { SetAlgorithmCommand } from "../../../../domain/commands/SetAlgorithmCommand";
import { mapStringToPathfindingAlgorithm } from "../../../../domain/types/PathfindingAlgorithmType";
import { useCommand } from "../../../adapters/mediator/hooks/useCommand";
import { PATHFINDING_ALGORITHMS } from "../../../constants/pathfindingConstants";
import { useAlgorithm } from "../../../hooks/useAlgorithm";

type PathfindingComponent = React.FC;

const Pathfinding: PathfindingComponent = () => {
  const sendCommand = useCommand();
  const { isAlgorithmRunning } = useAlgorithm();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    sendCommand(
      SetAlgorithmCommand.name,
      new SetAlgorithmCommand(
        mapStringToPathfindingAlgorithm(event.target.value)
      )
    );
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
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
