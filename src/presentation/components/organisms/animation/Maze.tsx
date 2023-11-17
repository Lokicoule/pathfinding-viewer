import { SetAlgorithmCommand } from "../../../../domain/commands/SetAlgorithmCommand";
import { mapStringToMazeAlgorithm } from "../../../../domain/types/MazeAlgorithmType";
import { useCommand } from "../../../adapters/mediator/hooks/useCommand";
import { MAZE_ALGORITHMS } from "../../../constants/mazeConstants";
import { useAlgorithm } from "../../../hooks/useAlgorithm";
import Select from "../../atoms/inputs/Select";

type MazeComponent = React.FC;

const Maze: MazeComponent = () => {
  const sendCommand = useCommand();
  const { isAlgorithmRunning } = useAlgorithm();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    sendCommand(
      SetAlgorithmCommand.name,
      new SetAlgorithmCommand(mapStringToMazeAlgorithm(event.target.value))
    );
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <p className="text-lg font-semibold text-white">Maze Algorithm</p>
      <div className="flex flex-row gap-4">
        <select
          disabled={isAlgorithmRunning}
          onChange={handleSelectChange}
          className="p-2"
        >
          {Array.from(MAZE_ALGORITHMS).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Maze;
