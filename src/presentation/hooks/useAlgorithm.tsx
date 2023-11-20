import { compositionRoot } from "../../bootstrapping/bootstrap";
import { ExperienceStoreState } from "@infra/stores/ExperienceStore";
import { useStoreWithSelector } from "../adapters/store/hooks/useStoreWithSelector";

export const useAlgorithm = () => {
  return useStoreWithSelector<
    ExperienceStoreState,
    Pick<ExperienceStoreState, "algorithm" | "isAlgorithmRunning">
  >(compositionRoot.stores.experienceStore, (state) => ({
    algorithm: state.algorithm,
    isAlgorithmRunning: state.isAlgorithmRunning,
  }));
};
