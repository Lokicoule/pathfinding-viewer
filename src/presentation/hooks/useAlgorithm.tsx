import { compositionRoot } from "../../bootstrapping/bootstrap";
import { useStoreWithSelector } from "../adapters/store/hooks/useStoreWithSelector";

export const useAlgorithm = () => {
  return useStoreWithSelector(
    compositionRoot.stores.algorithmStore,
    (state) => ({
      algorithm: state.algorithm,
      isAlgorithmRunning: state.isAlgorithmRunning,
    })
  );
};
