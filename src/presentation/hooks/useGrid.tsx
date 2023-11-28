import { compositionRoot } from "../../bootstrapping/bootstrap";
import { useStoreWithSelector } from "../adapters/store/hooks/useStoreWithSelector";

export const useGrid = () => {
  return useStoreWithSelector(compositionRoot.stores.gridStore, (state) => ({
    nodes: state.grid.getNodes(),
  }));
};
