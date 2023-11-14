import Button from "./button/Button";
import { useCommand } from "../adapters/mediator/hooks";
import { usePlayback } from "../hooks/usePlayback";
import { PauseCommand } from "../../domain/commands/playback/PauseCommand";
import PauseIcon from "./icons/PauseIcon";
import { StopCommand } from "../../domain/commands/playback/StopCommand";
import { ResumeCommand } from "../../domain/commands/playback/ResumeCommand";
import PlayIcon from "./icons/PlayIcon";
import StopIcon from "./icons/StopIcon";

type AnimationPlayerComponent = React.FC;

export const AnimationPlayer: AnimationPlayerComponent = () => {
  const { playback } = usePlayback();
  const sendCommand = useCommand();

  return (
    <div className="flex justify-center items-center gap-10">
      <Button
        disabled={playback.isStopped()}
        onClick={() => sendCommand(PauseCommand.name, new PauseCommand())}
      >
        <PauseIcon
          className={`w-6 h-6 text-white hover:text-gray-300 cursor-pointer 
          bg-gray-800 rounded-full
          ${playback.isPaused() ? "text-gray-300" : ""}`}
        />
      </Button>
      <Button
        disabled={playback.isStopped()}
        onClick={() => sendCommand(StopCommand.name, new StopCommand())}
      >
        <StopIcon
          className={`w-6 h-6 text-white hover:text-gray-300 cursor-pointer 
        bg-gray-800 rounded-full
        ${playback.isStopped() ? "text-gray-300" : ""}`}
        />
      </Button>
      <Button
        disabled={!playback.isPaused()}
        onClick={() => sendCommand(ResumeCommand.name, new ResumeCommand())}
      >
        <PlayIcon
          className={`w-6 h-6 text-white hover:text-gray-300 cursor-pointer 
          bg-gray-800 rounded-full
          ${playback.isResumed() ? "text-gray-300" : ""}`}
        />
      </Button>
    </div>
  );
};

export default AnimationPlayer;
