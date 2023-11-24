import { useIsEnvironmentLocked } from "@/presentation/hooks/useIsEnvironmentLocked";
import { ToggleButton } from "@ui/components/ui";
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
  const { isEnvironmentLocked, loading } = useIsEnvironmentLocked();

  if (loading) {
    return (
      <div className="flex flex-col space-y-2 justify-between">
        <ToggleButton
          key="loading"
          isActive={false}
          disabled={true}
          onClick={() => {}}
        >
          Loading...
        </ToggleButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2 justify-between">
      {algorithms.map((algorithm) => (
        <ToggleButton
          key={algorithm.type}
          isActive={algorithm.type === activeAlgorithm.type}
          disabled={isEnvironmentLocked}
          onClick={() => onAlgorithmClick(algorithm)}
        >
          {algorithm.name}
        </ToggleButton>
      ))}
    </div>
  );
};

export default AlgorithmToggleButtonList;
