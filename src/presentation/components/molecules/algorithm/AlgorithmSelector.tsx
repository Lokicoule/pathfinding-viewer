import { useState } from "react";
import { PlaybackCommandBuilder } from "../../../../domain/builders/PlaybackCommandBuilder";
import { SetAlgorithmCommand } from "../../../../domain/commands/SetAlgorithmCommand";
import { Algorithm } from "../../../../domain/valueObjects/Algorithm";
import { useCommand } from "../../../adapters/mediator/hooks/useCommand";
import { useAlgorithm } from "../../../hooks/useAlgorithm";
import { AlgorithmViewModel } from "../../../viewModels/AlgorithmViewModel";
import ToggleButton from "../../atoms/buttons/ToggleButton";
import Card from "../card/Card";
import Button from "../../atoms/buttons/Button";

type AlgorithmSelectorProps = {
  algorithms: AlgorithmViewModel[];
  title: string;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

type AlgorithmSelectorComponent = React.FC<AlgorithmSelectorProps>;

const AlgorithmSelector: AlgorithmSelectorComponent = ({
  algorithms,
  className,
  title,
}: AlgorithmSelectorProps): React.ReactElement => {
  const sendCommand = useCommand();
  const { isAlgorithmRunning, algorithm: persistedAlgorithm } = useAlgorithm();
  persistedAlgorithm.value;

  const [localAlgorithm, setLocalAlgorithm] = useState<AlgorithmViewModel>(
    algorithms.find((algo) => persistedAlgorithm.value === algo.type) ||
      algorithms.find((algorithm) => algorithm?.default) ||
      algorithms[0]
  );

  const handleSetClick = (algorithm: AlgorithmViewModel) => {
    setLocalAlgorithm(algorithm);
    sendCommand(
      SetAlgorithmCommand.name,
      new SetAlgorithmCommand(algorithm.type)
    );
  };

  const handlePlayClick = () => {
    const command = PlaybackCommandBuilder.build(
      "play",
      Algorithm.create(localAlgorithm.type)
    );
    sendCommand(
      SetAlgorithmCommand.name,
      new SetAlgorithmCommand(localAlgorithm.type)
    );
    sendCommand(command.name, command);
  };

  return (
    <Card isBlurred className={className}>
      <Card.Header className="flex flex-col space-y-4 px-4 py-5 sm:p-6 ">
        <h1 className="text-lg font-semibold text-white text-center font-primary">
          {title}
        </h1>
      </Card.Header>
      <Card.Body className="flex flex-col py-2">
        <div className="flex flex-col space-y-2 justify-between">
          {algorithms.map((algorithm) => (
            <ToggleButton
              key={algorithm.type}
              isActive={algorithm.type === localAlgorithm.type}
              disabled={isAlgorithmRunning}
              onClick={() => handleSetClick(algorithm)}
            >
              {algorithm.name}
            </ToggleButton>
          ))}
        </div>
      </Card.Body>
      <Card.Footer className="p-6">
        <Button disabled={isAlgorithmRunning} onClick={handlePlayClick}>
          {Algorithm.isPathfindingAlgorithm(localAlgorithm.type)
            ? "Visualize"
            : "Generate"}
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default AlgorithmSelector;
