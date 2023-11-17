import { PlaybackCommandBuilder } from "../../../../domain/builders/PlaybackCommandBuilder";
import { ToggleAnimationCommand } from "../../../../domain/commands/animation/ToggleAnimation";
import { useCommand } from "../../../adapters/mediator/hooks/useCommand";
import { useAlgorithm, useAnimation, usePlayback } from "../../../hooks";
import { PauseIcon, PlayIcon, StopIcon } from "../../atoms/icons";
import Checkbox from "../../atoms/inputs/Checkbox";
import AnimationControlButton from "../../molecules/animation/AnimationControlButton";
import AnimationSpeedControl from "../../molecules/animation/AnimationSpeed";

type AnimationControlsComponent = React.FC;

const AnimationControls: AnimationControlsComponent = () => {
  const sendCommand = useCommand();
  const playback = usePlayback();
  const { algorithm } = useAlgorithm();
  const { isActivated } = useAnimation();

  const sendPlaybackCommand = (
    action: "play" | "pause" | "stop" | "resume"
  ) => {
    const command = PlaybackCommandBuilder.build(action, algorithm);
    sendCommand(command.name, command);
  };

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
            sendPlaybackCommand("pause");
          }
        }}
      >
        <span className="font-bold">
          Animation
          <span
            className={`ml-2 ${isActivated ? "text-teal-400" : "text-red-400"}`}
          >
            {isActivated ? "ON" : "OFF"}
          </span>
        </span>
      </Checkbox>

      <AnimationControlButton
        action="play"
        tooltipText="Play"
        IconComponent={PlayIcon}
        isVisible={!isActivated || playback.isStopped}
        isDisabled={!algorithm}
      />
      <AnimationControlButton
        action="pause"
        tooltipText="Pause"
        IconComponent={PauseIcon}
        isVisible={isActivated && (playback.isPlaying || playback.isResumed)}
      />
      <AnimationControlButton
        action="resume"
        tooltipText="Resume"
        IconComponent={PlayIcon}
        isVisible={isActivated && playback.isPaused}
      />
      {isActivated && <AnimationSpeedControl />}

      <AnimationControlButton
        action="stop"
        tooltipText="Stop"
        IconComponent={StopIcon}
        isVisible={isActivated}
        isDisabled={playback.isStopped}
      />
    </div>
  );
};

export default AnimationControls;
