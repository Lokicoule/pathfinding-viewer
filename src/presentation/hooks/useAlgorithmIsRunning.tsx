import { useStoreWithSelector } from "../adapters/store/hooks/useStoreWithSelector";
import { compositionRoot } from "../../bootstrapping/bootstrap";
import { ExperienceStoreState } from "../../infrastructure/stores/ExperienceStore";

export const useAlgorithmIsRunning = () => {
  return useStoreWithSelector<
    ExperienceStoreState,
    ExperienceStoreState["isAlgorithmRunning"]
  >(
    compositionRoot.stores.experienceStore,
    (state) => state.isAlgorithmRunning
  );
};
