import { useState } from "react";
import { PlaybackCommandBuilder } from "../../../../domain/builders/PlaybackCommandBuilder";
import { SetAlgorithmCommand } from "../../../../domain/commands/SetAlgorithmCommand";
import { Algorithm } from "../../../../domain/valueObjects/Algorithm";
import { useCommand } from "../../../adapters/mediator/hooks/useCommand";
import { useAlgorithm } from "../../../hooks/useAlgorithm";
import { AlgorithmViewModel } from "../../../viewModels/AlgorithmViewModel";
import Card from "../card/Card";

type AlgorithmSelectorProps = {
  algorithms: AlgorithmViewModel[];
  title: string;
};

type AlgorithmSelectorComponent = React.FC<AlgorithmSelectorProps>;

const AlgorithmSelector: AlgorithmSelectorComponent = ({
  algorithms,
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
    <Card isBlurred className="rounded-lg w-full h-1/2 overflow-y-auto">
      <Card.Header className="flex flex-col space-y-4 px-4 py-5 sm:p-6 ">
        <h1 className="text-lg font-semibold text-white text-center">
          {title}
        </h1>
      </Card.Header>
      <Card.Body className="flex flex-col py-2">
        <div className="flex flex-col space-y-2 justify-between">
          {algorithms.map((algorithm) => (
            <button
              disabled={isAlgorithmRunning}
              key={algorithm.type}
              onClick={() => handleSetClick(algorithm)}
              type="button"
              className={`text-white hover:text-white border border-white hover:bg-neutral-100 hover:bg-opacity-30
            font-medium text-sm py-2.5 text-center border-opacity-25
           ${
             localAlgorithm.type === algorithm.type
               ? "bg-neutral-100 bg-opacity-50 text-neutral-700 rounded-sm"
               : "mx-2 "
           }
           `}
            >
              {algorithm.name}
            </button>
          ))}
        </div>
      </Card.Body>
      <Card.Footer className="p-6">
        <button
          disabled={isAlgorithmRunning}
          onClick={handlePlayClick}
          className={`w-full text-center text-white bg-neutral-200 bg-opacity-50 text-neutral-700 hover:bg-opacity-30
          shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 
transition duration-300 ease-in-out 
`}
        >
          {Algorithm.isPathfindingAlgorithm(localAlgorithm.type)
            ? "Visualize Pathfinding"
            : "Generate Maze"}
        </button>
      </Card.Footer>
    </Card>
  );
};

export default AlgorithmSelector;
