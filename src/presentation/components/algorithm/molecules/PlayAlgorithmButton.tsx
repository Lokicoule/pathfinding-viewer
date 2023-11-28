import {
  Algorithm,
  AlgorithmType,
  SetAlgorithmCommand,
} from "@domain/algorithm";
import { AnimationCommandBuilder } from "@domain/animation";
import { useCommand } from "@ui/adapters/mediator/hooks";
import { Button } from "@ui/components/ui";
import { useIsEnvironmentLocked } from "@ui/hooks";

type PlayAlgorithmButtonProps = {
  type: AlgorithmType;
};

const PlayAlgorithmButton: React.FC<PlayAlgorithmButtonProps> = ({ type }) => {
  const sendCommand = useCommand();
  const { isEnvironmentLocked } = useIsEnvironmentLocked();

  const handlePlayClick = () => {
    sendCommand(new SetAlgorithmCommand(type));
    sendCommand(AnimationCommandBuilder.build("play", Algorithm.create(type)));
  };

  return (
    <Button disabled={isEnvironmentLocked} onClick={() => handlePlayClick()}>
      {Algorithm.isPathfindingAlgorithm(type) ? "Visualize" : "Generate"}
    </Button>
  );
};

export default PlayAlgorithmButton;
