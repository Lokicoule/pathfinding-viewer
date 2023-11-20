import { PlaybackCommandBuilder } from "@domain/builders/PlaybackCommandBuilder";
import { ToggleAnimationCommand } from "@domain/commands/animation/ToggleAnimation";
import { useCommand } from "../../../adapters/mediator/hooks/useCommand";
import { useAlgorithm, useAnimation, usePlayback } from "../../../hooks";
import { PauseIcon, PlayIcon, StopIcon } from "../../ui/atoms/icons";
import AnimationControlButton from "../molecules/AnimationControlButton";
import AnimationSpeedControl from "../molecules/AnimationSpeed";

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
    <div className="flex flex-wrap flex-row gap-4 items-center justify-center">
      <div className="block min-h-[1.5rem] pl-[1.5rem]">
        <input
          className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
          type="checkbox"
          checked={isActivated}
          id="checkboxAnimation"
          onChange={() => {
            sendCommand(
              ToggleAnimationCommand.name,
              new ToggleAnimationCommand()
            );
            if (playback.isPlaying || playback.isResumed) {
              sendPlaybackCommand("pause");
            }
          }}
        />
        <label
          className="inline-block pl-[0.4rem] hover:cursor-pointer text-sm text-white font-primary"
          htmlFor="checkboxAnimation"
        >
          Play Animation
        </label>
      </div>

      {isActivated && <AnimationSpeedControl />}

      <AnimationControlButton
        action="play"
        tooltipText="Play"
        IconComponent={PlayIcon}
        isVisible={isActivated && playback.isStopped}
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
