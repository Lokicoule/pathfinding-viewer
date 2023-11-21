import { useState } from "react";

import { SetAlgorithmCommand } from "@domain/algorithm";
import { useCommand } from "@ui/adapters/mediator/hooks";
import { Card } from "@ui/components/ui";
import { getInitialAlgorithm } from "@ui/helpers/algorithm";
import { useAlgorithm } from "@ui/hooks";
import { AlgorithmViewModel } from "@ui/viewModels/AlgorithmViewModel";
import { AlgorithmToggleButtonList, PlayAlgorithmButton } from "../molecules";

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
