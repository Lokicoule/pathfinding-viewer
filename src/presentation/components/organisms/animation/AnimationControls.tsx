import { PlaybackCommandBuilder } from "../../../../domain/builders/PlaybackCommandBuilder";
import { ToggleAnimationCommand } from "../../../../domain/commands/animation/ToggleAnimation";
import { useCommand } from "../../../adapters/mediator/hooks/useCommand";
import { useAlgorithm } from "../../../hooks/useAlgorithm";
import { useAnimation } from "../../../hooks/useAnimation";
import { usePlayback } from "../../../hooks/usePlayback";
import Button from "../../atoms/button/Button";
import PauseIcon from "../../atoms/icons/PauseIcon";
import PlayIcon from "../../atoms/icons/PlayIcon";
import StopIcon from "../../atoms/icons/StopIcon";
import Checkbox from "../../atoms/inputs/Checkbox";
import Tooltip from "../../atoms/tooltip/Tooltip";
import AnimationSpeedControl from "./AnimationSpeed";

type AnimationControlsComponent = React.FC;

const AnimationControls: AnimationControlsComponent = () => {
  const { isActivated } = useAnimation();
  const sendCommand = useCommand();
  const { algorithm } = useAlgorithm();

  const playback = usePlayback();

  return (
    <div className="flex flex-row gap-4">
      <Checkbox
        checked={isActivated}
        onChange={() => {
          sendCommand(
            ToggleAnimationCommand.name,
            new ToggleAnimationCommand()
          );
          if (playback.isPlaying || playback.isResumed) {
            sendCommand(
              PlaybackCommandBuilder.build("stop", algorithm).name,
              PlaybackCommandBuilder.build("stop", algorithm)
            );
          }
        }}
      />
      {isActivated && (playback.isPlaying || playback.isResumed) && (
        <Tooltip text="Pause">
          <Button
            onClick={() =>
              sendCommand(
                PlaybackCommandBuilder.build("pause", algorithm).name,
                PlaybackCommandBuilder.build("pause", algorithm)
              )
            }
          >
            <PauseIcon className="w-10 h-10 text-gray-800 hover:text-white cursor-pointer bg-gradient-to-r from-rose-100 to-teal-100 hover:from-rose-200 hover:to-teal-200 rounded-full" />
          </Button>
        </Tooltip>
      )}
      {isActivated && playback.isPaused && (
        <Tooltip text="Resume">
          <Button
            onClick={() =>
              sendCommand(
                PlaybackCommandBuilder.build("resume", algorithm).name,
                PlaybackCommandBuilder.build("resume", algorithm)
              )
            }
          >
            <PlayIcon className="w-10 h-10 text-gray-800 hover:text-white cursor-pointer bg-gradient-to-r from-rose-100 to-teal-100 hover:from-rose-200 hover:to-teal-200 rounded-full" />
          </Button>
        </Tooltip>
      )}
      {(!isActivated || playback.isStopped) && (
        <Tooltip text="Play">
          <Button
            disabled={!algorithm}
            onClick={() => {
              sendCommand(
                PlaybackCommandBuilder.build("play", algorithm).name,
                PlaybackCommandBuilder.build("play", algorithm)
              );
            }}
            className="text-white font-bold py-2 px-4 rounded-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PlayIcon className="w-10 h-10 text-gray-800 hover:text-white cursor-pointer bg-gradient-to-r from-rose-100 to-teal-100 hover:from-rose-200 hover:to-teal-200 rounded-full" />
          </Button>
        </Tooltip>
      )}
      {isActivated && <AnimationSpeedControl />}
      {isActivated && (
        <Tooltip text="Stop">
          <Button
            disabled={playback.isStopped}
            className="disabled:cursor-not-allowed disabled:opacity-20"
            onClick={() =>
              sendCommand(
                PlaybackCommandBuilder.build("stop", algorithm).name,
                PlaybackCommandBuilder.build("stop", algorithm)
              )
            }
          >
            <StopIcon className="w-10 h-10 text-white hover:text-gray-300 cursor-pointer bg-gray-800 rounded-full" />
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

export default AnimationControls;
