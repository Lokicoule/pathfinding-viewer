import { AlgorithmType } from "@/domain/algorithm/types/AlgorithmType";
import { AlgorithmViewModel } from "../viewModels/AlgorithmViewModel";

export const getInitialAlgorithm = (
  algorithms: AlgorithmViewModel[],
  type: AlgorithmType
): AlgorithmViewModel => {
  return (
    algorithms.find((algo) => type === algo.type) ||
    algorithms.find((algorithm) => algorithm?.default) ||
    algorithms[0]
  );
};
