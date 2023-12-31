import { AnimationCommandBuilder } from "@domain/animation";
import { useCommand } from "@ui/adapters/mediator/hooks";
import { useAlgorithm } from "@ui/hooks";
import { Button, Tooltip } from "@ui/components/ui";

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
    if (!algorithm) return;
    sendCommand(AnimationCommandBuilder.build(action, algorithm));
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
