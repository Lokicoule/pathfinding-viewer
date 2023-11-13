import { useStoreWithSelector } from "../adapters/store/hooks/useStoreWithSelector";
import { compositionRoot } from "../../bootstrapping/bootstrap";
import { ExperienceStoreState } from "../../infrastructure/stores/ExperienceStore";

export const useAlgorithm = () => {
  return useStoreWithSelector<
    ExperienceStoreState,
    Pick<ExperienceStoreState, "algorithm" | "isAlgorithmRunning">
  >(compositionRoot.stores.experienceStore, (state) => ({
    algorithm: state.algorithm,
    isAlgorithmRunning: state.isAlgorithmRunning,
  }));
};
