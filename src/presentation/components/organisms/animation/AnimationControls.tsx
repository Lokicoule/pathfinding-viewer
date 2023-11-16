import { PlaybackCommandBuilder } from "../../../../domain/builders/PlaybackCommandBuilder";
import { useCommand } from "../../../adapters/mediator/hooks/useCommand";
import { useAlgorithm } from "../../../hooks/useAlgorithm";
import { usePlayback } from "../../../hooks/usePlayback";
import Button from "../../atoms/button/Button";
import PauseIcon from "../../atoms/icons/PauseIcon";
import PlayIcon from "../../atoms/icons/PlayIcon";
import Tooltip from "../../atoms/tooltip/Tooltip";
import AnimationSpeedControl from "./AnimationSpeed";
import Stop from "./Stop";

type AnimationControlsComponent = React.FC;

const AnimationControls: AnimationControlsComponent = () => {
  const sendCommand = useCommand();
  const { algorithm } = useAlgorithm();

  const playback = usePlayback();

  return (
    <div className="flex flex-row gap-4">
      {(playback.isPlaying || playback.isResumed) && (
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
      {playback.isPaused && (
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
      {playback.isStopped && (
        <Tooltip text="Generate">
          <Button
            disabled={!algorithm}
            onClick={() =>
              sendCommand(
                PlaybackCommandBuilder.build("play", algorithm).name,
                PlaybackCommandBuilder.build("play", algorithm)
              )
            }
            className="text-white font-bold py-2 px-4 rounded-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PlayIcon className="w-10 h-10 text-gray-800 hover:text-white cursor-pointer bg-gradient-to-r from-rose-100 to-teal-100 hover:from-rose-200 hover:to-teal-200 rounded-full" />
          </Button>
        </Tooltip>
      )}
      <Stop />
      <AnimationSpeedControl />
    </div>
  );
};

export default AnimationControls;
