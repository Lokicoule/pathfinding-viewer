import { useState } from "react";
import { PauseMazeCommand } from "../../../../domain/commands/maze/PauseMazeCommand";
import { PlayMazeCommand } from "../../../../domain/commands/maze/PlayMazeCommand";
import { ResumeMazeCommand } from "../../../../domain/commands/maze/ResumeMazeCommand";
import { StopMazeCommand } from "../../../../domain/commands/maze/StopMazeCommand";
import {
  MazeAlgorithmType,
  mapStringToMazeAlgorithm,
} from "../../../../domain/types/MazeAlgorithmType";
import { useCommand } from "../../../adapters/mediator/hooks/useCommand";
import { MAZE_ALGORITHMS } from "../../../constants/mazeConstants";
import { useAlgorithm } from "../../../hooks/useAlgorithm";
import { useMazePlayback } from "../../../hooks/usePlayback";
import Button from "../../atoms/button/Button";
import PauseIcon from "../../atoms/icons/PauseIcon";
import PlayIcon from "../../atoms/icons/PlayIcon";
import StopIcon from "../../atoms/icons/StopIcon";
import Tooltip from "../../atoms/tooltip/Tooltip";

type MazeComponent = React.FC;

const Maze: MazeComponent = () => {
  const { isAlgorithmRunning } = useAlgorithm();
  const { playback } = useMazePlayback();
  const [algorithm, setAlgorithm] = useState<MazeAlgorithmType>(
    MAZE_ALGORITHMS.keys().next().value
  );
  const sendCommand = useCommand();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(mapStringToMazeAlgorithm(event.target.value));
  };

  return (
    <div className="flex flex-col">
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
        {(playback.isPlaying() || playback.isResumed()) && (
          <Tooltip text="Pause">
            <Button
              onClick={() =>
                sendCommand(PauseMazeCommand.name, new PauseMazeCommand())
              }
            >
              <PauseIcon className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer bg-gray-800 rounded-full" />
            </Button>
          </Tooltip>
        )}
        {playback.isPaused() && (
          <Tooltip text="Resume">
            <Button
              onClick={() =>
                sendCommand(ResumeMazeCommand.name, new ResumeMazeCommand())
              }
            >
              <PlayIcon className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer bg-gray-800 rounded-full" />
            </Button>
          </Tooltip>
        )}
        {playback.isStopped() && (
          <Tooltip text="Generate Maze">
            <Button
              onClick={() =>
                sendCommand(
                  PlayMazeCommand.name,
                  new PlayMazeCommand(algorithm)
                )
              }
              className="text-white font-bold py-2 px-4 rounded-full"
            >
              <PlayIcon className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer bg-gray-800 rounded-full" />
            </Button>
          </Tooltip>
        )}
        {!playback.isStopped() && (
          <Tooltip text="Stop">
            <Button
              onClick={() =>
                sendCommand(StopMazeCommand.name, new StopMazeCommand())
              }
            >
              <StopIcon className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer bg-gray-800 rounded-full" />
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Maze;
