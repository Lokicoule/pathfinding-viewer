import { compositionRoot } from "../../bootstrapping/bootstrap";
import { useStoreWithSelector } from "../adapters/store/hooks/useStoreWithSelector";

export const useAnimation = () => {
  return useStoreWithSelector(
    compositionRoot.stores.animationStore,
    (state) => ({
      isActivated: state.isActivated,
      speed: state.speed,
    })
  );
};
