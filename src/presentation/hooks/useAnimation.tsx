import { useStoreWithSelector } from "../adapters/store/hooks/useStoreWithSelector";
import { compositionRoot } from "../../bootstrapping/bootstrap";
import { AnimationStoreState } from "@infra/stores/AnimationStore";

export const useAnimation = () => {
  return useStoreWithSelector<
    AnimationStoreState,
    Pick<AnimationStoreState, "isActivated" | "speed">
  >(compositionRoot.stores.animationStore, (state) => ({
    isActivated: state.isActivated,
    speed: state.speed,
  }));
};
