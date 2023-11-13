import { useState } from "react";
import { MazeRunnerCommand } from "../../domain/commands/MazeRunnerCommand";
import {
  MazeAlgorithmType,
  mapStringToMazeAlgorithm,
} from "../../domain/types/MazeAlgorithmType";
import { useCommand } from "../adapters/mediator/hooks/useCommand";

type MazeComponent = React.FC;

const MAZE_ALGORITHMS = new Map<MazeAlgorithmType, string>([
  ["RECURSIVE_DIVISION", "Recursive Division"],
  ["PRIMS", "Prim's Algorithm"],
  ["DFS", "Depth-First Search"],
]);

const Maze: MazeComponent = () => {
  const [algorithm, setAlgorithm] = useState<MazeAlgorithmType>(
    MAZE_ALGORITHMS.keys().next().value
  );
  const sendCommand = useCommand();

  const mazeAlgorithmMediator = (algorithm: string) => {
    sendCommand(
      MazeRunnerCommand.name,
      new MazeRunnerCommand(mapStringToMazeAlgorithm(algorithm))
    );
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(mapStringToMazeAlgorithm(event.target.value));
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="maze-algorithm" className="text-lg font-semibold">
        Maze Algorithm
      </label>
      <div className="flex flex-row gap-4">
        <select
          onChange={handleSelectChange}
          name="maze-algorithm"
          className="p-2"
        >
          {Array.from(MAZE_ALGORITHMS).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        <button
          onClick={() => mazeAlgorithmMediator(algorithm)}
          className="text-white font-bold py-2 px-4 rounded-full"
        >
          Run
        </button>
      </div>
    </div>
  );
};

export default Maze;
