import { StopMazeCommand } from "../../../../domain/commands/maze/StopMazeCommand";
import { StopPathfindingCommand } from "../../../../domain/commands/pathfinding/StopPathfindingCommand";
import { useCommand } from "../../../adapters/mediator/hooks";
import {
  useMazePlayback,
  usePathfindingPlayback,
} from "../../../hooks/usePlayback";
import Button from "../../atoms/button/Button";
import StopIcon from "../../atoms/icons/StopIcon";
import Tooltip from "../../atoms/tooltip/Tooltip";

type StopComponent = React.FC;

const Stop: StopComponent = () => {
  const sendCommand = useCommand();
  const { playback: pathfindingPlayback } = usePathfindingPlayback();
  const { playback: mazePlayback } = useMazePlayback();

  let buttonProps = {};

  if (!mazePlayback.isStopped()) {
    buttonProps = {
      onClick: () => sendCommand(StopMazeCommand.name, new StopMazeCommand()),
      children: (
        <StopIcon className="w-10 h-10 text-white hover:text-gray-300 cursor-pointer bg-gray-800 rounded-full" />
      ),
    };
  } else if (!pathfindingPlayback.isStopped()) {
    buttonProps = {
      onClick: () =>
        sendCommand(StopPathfindingCommand.name, new StopPathfindingCommand()),
      children: (
        <StopIcon className="w-10 h-10 text-white hover:text-gray-300 cursor-pointer bg-gray-800 rounded-full" />
      ),
    };
  } else {
    buttonProps = {
      disabled: true,
      children: (
        <StopIcon className="w-10 h-10 text-gray-500 bg-gray-800 rounded-full" />
      ),
    };
  }

  return (
    <Tooltip text="Stop animation">
      <Button {...buttonProps} />
    </Tooltip>
  );
};

export default Stop;
