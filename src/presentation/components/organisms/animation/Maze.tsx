import { useState } from "react";
import { SetAlgorithmCommand } from "../../../../domain/commands/SetAlgorithmCommand";
import {
  MazeAlgorithmType,
  mapStringToMazeAlgorithm,
} from "../../../../domain/types/MazeAlgorithmType";
import { useCommand } from "../../../adapters/mediator/hooks/useCommand";
import { MAZE_ALGORITHMS } from "../../../constants/mazeConstants";
import { useAlgorithm } from "../../../hooks/useAlgorithm";
import Select from "../../atoms/select/Select";

type MazeComponent = React.FC;

const Maze: MazeComponent = () => {
  const sendCommand = useCommand();
  const { isAlgorithmRunning } = useAlgorithm();

  const [algorithm, setAlgorithm] = useState<MazeAlgorithmType>(
    MAZE_ALGORITHMS.keys().next().value
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(mapStringToMazeAlgorithm(event.target.value));
    sendCommand(SetAlgorithmCommand.name, new SetAlgorithmCommand(algorithm));
  };

  return (
    <div className="flex flex-col">
      <p className="text-lg font-semibold text-white">Maze Algorithm</p>
      <div className="flex flex-row gap-4">
        <Select
          disabled={isAlgorithmRunning}
          onChange={handleSelectChange}
          className="p-2"
        >
          {Array.from(MAZE_ALGORITHMS).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default Maze;
