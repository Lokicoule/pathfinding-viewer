import { ToggleButton } from "@ui/components/ui";
import { useAlgorithm } from "@ui/hooks";
import { AlgorithmViewModel } from "@ui/viewModels/AlgorithmViewModel";

type AlgorithmToggleButtonListProps = {
  algorithms: AlgorithmViewModel[];
  activeAlgorithm: AlgorithmViewModel;
  onAlgorithmClick: (algorithm: AlgorithmViewModel) => void;
};
type AlgorithmToggleButtonListComponent =
  React.FC<AlgorithmToggleButtonListProps>;

const AlgorithmToggleButtonList: AlgorithmToggleButtonListComponent = ({
  algorithms,
  activeAlgorithm,
  onAlgorithmClick,
}) => {
  const { isAlgorithmRunning } = useAlgorithm();

  return (
    <div className="flex flex-col space-y-2 justify-between">
      {algorithms.map((algorithm) => (
        <ToggleButton
          key={algorithm.type}
          isActive={algorithm.type === activeAlgorithm.type}
          disabled={isAlgorithmRunning}
          onClick={() => onAlgorithmClick(algorithm)}
        >
          {algorithm.name}
        </ToggleButton>
      ))}
    </div>
  );
};

export default AlgorithmToggleButtonList;
