import { PlaybackCommandBuilder } from "../../../../domain/builders/PlaybackCommandBuilder";
import { useCommand } from "../../../adapters/mediator/hooks";
import { useAlgorithm } from "../../../hooks";
import Button from "../../atoms/buttons/Button";
import Tooltip from "../../atoms/tooltip/Tooltip";

type AnimationControlButtonProps = {
  action: "play" | "pause" | "stop" | "resume";
  tooltipText: string;
  IconComponent: React.ElementType;
  isVisible: boolean;
  isDisabled?: boolean;
};

const AnimationControlButton: React.FC<AnimationControlButtonProps> = ({
  action,
  tooltipText,
  IconComponent,
  isVisible,
  isDisabled,
}) => {
  const sendCommand = useCommand();
  const { algorithm } = useAlgorithm();

  const sendPlaybackCommand = () => {
    const command = PlaybackCommandBuilder.build(action, algorithm);
    sendCommand(command.name, command);
  };

  return isVisible ? (
    <Tooltip text={tooltipText}>
      <Button
        variant="base"
        disabled={isDisabled}
        onClick={sendPlaybackCommand}
        className="disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:hidden"
      >
        <IconComponent className="w-10 h-10 text-[#313b48] hover:text-white cursor-pointer bg-gradient-to-r from-rose-100 to-teal-100 hover:from-rose-200 hover:to-teal-200 rounded-full " />
      </Button>
    </Tooltip>
  ) : null;
};

export default AnimationControlButton;
