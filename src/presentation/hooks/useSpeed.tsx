import { useStoreWithSelector } from "../adapters/store/hooks/useStoreWithSelector";
import { compositionRoot } from "../../bootstrapping/bootstrap";
import { ExperienceStoreState } from "../../infrastructure/stores/ExperienceStore";

export const useSpeed = () => {
  return useStoreWithSelector<
    ExperienceStoreState,
    Pick<ExperienceStoreState, "speed">
  >(compositionRoot.stores.experienceStore, (state) => ({
    speed: state.speed,
  }));
};
