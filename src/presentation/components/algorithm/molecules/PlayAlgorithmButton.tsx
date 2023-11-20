import { PlaybackCommandBuilder } from "@domain/builders/PlaybackCommandBuilder";
import { SetAlgorithmCommand } from "@domain/commands/SetAlgorithmCommand";
import { AlgorithmType } from "@domain/types/AlgorithmType";
import { Algorithm } from "@domain/valueObjects/Algorithm";
import { useCommand } from "../../../adapters/mediator/hooks";
import { useAlgorithm } from "../../../hooks";
import Button from "../../ui/atoms/buttons/Button";

type PlayAlgorithmButtonProps = {
  type: AlgorithmType;
};

const PlayAlgorithmButton: React.FC<PlayAlgorithmButtonProps> = ({ type }) => {
  const sendCommand = useCommand();
  const { isAlgorithmRunning } = useAlgorithm();

  const handlePlayClick = () => {
    const command = PlaybackCommandBuilder.build(
      "play",
      Algorithm.create(type)
    );
    sendCommand(SetAlgorithmCommand.name, new SetAlgorithmCommand(type));
    sendCommand(command.name, command);
  };

  return (
    <Button disabled={isAlgorithmRunning} onClick={() => handlePlayClick()}>
      {Algorithm.isPathfindingAlgorithm(type) ? "Visualize" : "Generate"}
    </Button>
  );
};

export default PlayAlgorithmButton;
