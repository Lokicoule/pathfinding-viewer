import { SetAlgorithmCommand } from "../../../../domain/commands/SetAlgorithmCommand";
import { AlgorithmType } from "../../../../domain/types/AlgorithmType";
import { useCommand } from "../../../adapters/mediator/hooks/useCommand";
import { useAlgorithm } from "../../../hooks/useAlgorithm";

type AlgorithmSelectorProps<T> = {
  algorithmType: string;
  mapStringToAlgorithm: (algorithm: string) => T;
  algorithms: Map<string, string>;
};

const AlgorithmSelector = <T extends Partial<AlgorithmType>>({
  algorithmType,
  mapStringToAlgorithm,
  algorithms,
}: AlgorithmSelectorProps<T>): React.ReactElement => {
  const sendCommand = useCommand();
  const { isAlgorithmRunning } = useAlgorithm();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    sendCommand(
      SetAlgorithmCommand.name,
      new SetAlgorithmCommand(mapStringToAlgorithm(event.target.value))
    );
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <p className="text-lg font-semibold text-white">{algorithmType}</p>
      <div className="flex flex-row gap-4">
        <select
          disabled={isAlgorithmRunning}
          onChange={handleSelectChange}
          className="p-2"
        >
          {Array.from(algorithms).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AlgorithmSelector;
