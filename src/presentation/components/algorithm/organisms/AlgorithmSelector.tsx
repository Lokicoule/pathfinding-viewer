import { useState } from "react";
import { SetAlgorithmCommand } from "@domain/commands/algorithm";
import { useCommand } from "../../../adapters/mediator/hooks/useCommand";
import { useAlgorithm } from "../../../hooks/useAlgorithm";
import { AlgorithmViewModel } from "../../../viewModels/AlgorithmViewModel";
import { AlgorithmToggleButtonList, PlayAlgorithmButton } from "../molecules";
import Card from "../../ui/molecules/card/Card";
import { getInitialAlgorithm } from "../../../helpers/algorithm";

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
  const { algorithm } = useAlgorithm();
  const [localAlgorithm, setLocalAlgorithm] = useState<AlgorithmViewModel>(
    getInitialAlgorithm(algorithms, algorithm.value)
  );

  const handleSetClick = (algorithm: AlgorithmViewModel) => {
    setLocalAlgorithm(algorithm);
    sendCommand(new SetAlgorithmCommand(algorithm.type));
  };

  return (
    <Card isBlurred className={className}>
      <Card.Header className="flex flex-col space-y-4 px-4 py-5 sm:p-6 ">
        <h1 className="text-lg font-semibold text-white text-center font-primary">
          {title}
        </h1>
      </Card.Header>
      <Card.Body className="flex flex-col py-2">
        <AlgorithmToggleButtonList
          algorithms={algorithms}
          activeAlgorithm={localAlgorithm}
          onAlgorithmClick={handleSetClick}
        />
      </Card.Body>
      <Card.Footer className="p-6">
        <PlayAlgorithmButton type={localAlgorithm.type} />
      </Card.Footer>
    </Card>
  );
};

export default AlgorithmSelector;
