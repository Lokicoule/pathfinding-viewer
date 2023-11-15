import { useState } from "react";
import { PausePathfindingCommand } from "../../../../domain/commands/pathfinding/PausePathfindingCommand";
import { PlayPathfindingCommand } from "../../../../domain/commands/pathfinding/PlayPathfindingCommand";
import { ResumePathfindingCommand } from "../../../../domain/commands/pathfinding/ResumePathfindingCommand";
import { StopPathfindingCommand } from "../../../../domain/commands/pathfinding/StopPathfindingCommand";
import {
  PathfindingAlgorithmType,
  mapStringToPathfindingAlgorithm,
} from "../../../../domain/types/PathfindingAlgorithmType";
import { useCommand } from "../../../adapters/mediator/hooks/useCommand";
import { PATHFINDING_ALGORITHMS } from "../../../constants/pathfindingConstants";
import { useAlgorithm } from "../../../hooks/useAlgorithm";
import { usePathfindingPlayback } from "../../../hooks/usePlayback";
import Button from "../../atoms/button/Button";
import PauseIcon from "../../atoms/icons/PauseIcon";
import PlayIcon from "../../atoms/icons/PlayIcon";
import StopIcon from "../../atoms/icons/StopIcon";
import Tooltip from "../../atoms/tooltip/Tooltip";

type PathfindingComponent = React.FC;

const Pathfinding: PathfindingComponent = () => {
  const { isAlgorithmRunning } = useAlgorithm();
  const { playback } = usePathfindingPlayback();
  const [algorithm, setAlgorithm] = useState<PathfindingAlgorithmType>(
    PATHFINDING_ALGORITHMS.keys().next().value
  );
  const sendCommand = useCommand();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(mapStringToPathfindingAlgorithm(event.target.value));
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
        {(playback.isPlaying() || playback.isResumed()) && (
          <Tooltip text="Pause">
            <Button
              onClick={() =>
                sendCommand(
                  PausePathfindingCommand.name,
                  new PausePathfindingCommand()
                )
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
                sendCommand(
                  ResumePathfindingCommand.name,
                  new ResumePathfindingCommand()
                )
              }
            >
              <PlayIcon className="w-6 h-6 text-white hover:text-gray-300 cursor-pointer bg-gray-800 rounded-full" />
            </Button>
          </Tooltip>
        )}
        {playback.isStopped() && (
          <Tooltip text="Generate Pathfinding">
            <Button
              onClick={() =>
                sendCommand(
                  PlayPathfindingCommand.name,
                  new PlayPathfindingCommand(algorithm)
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
                sendCommand(
                  StopPathfindingCommand.name,
                  new StopPathfindingCommand()
                )
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

export default Pathfinding;
