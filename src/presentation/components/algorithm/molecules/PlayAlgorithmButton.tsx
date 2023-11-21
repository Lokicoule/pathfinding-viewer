import { AnimationCommandBuilder } from "@/domain/builders/AnimationCommandBuilder";
import { SetAlgorithmCommand } from "@domain/commands/algorithm";
import { AlgorithmType } from "@domain/types/AlgorithmType";
import { Algorithm } from "@domain/valueObjects/Algorithm";
import { useCommand } from "../../../adapters/mediator/hooks";
import { useAlgorithm } from "../../../hooks";
import { Button } from "../../ui";

type PlayAlgorithmButtonProps = {
  type: AlgorithmType;
};

const PlayAlgorithmButton: React.FC<PlayAlgorithmButtonProps> = ({ type }) => {
  const sendCommand = useCommand();
  const { isAlgorithmRunning } = useAlgorithm();

  const handlePlayClick = () => {
    sendCommand(new SetAlgorithmCommand(type));
    sendCommand(AnimationCommandBuilder.build("play", Algorithm.create(type)));
  };

  return (
    <Button disabled={isAlgorithmRunning} onClick={() => handlePlayClick()}>
      {Algorithm.isPathfindingAlgorithm(type) ? "Visualize" : "Generate"}
    </Button>
  );
};

export default PlayAlgorithmButton;
