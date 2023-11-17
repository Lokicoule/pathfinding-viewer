import { compositionRoot } from "../../bootstrapping/bootstrap";
import { GridStoreState } from "../../infrastructure/stores/GridStore";
import { useStoreWithSelector } from "../adapters/store/hooks/useStoreWithSelector";

export const useGrid = () => {
  return useStoreWithSelector<
    GridStoreState,
    {
      nodes: GridStoreState["grid"]["nodes"];
    }
  >(compositionRoot.stores.gridStore, (state) => ({
    nodes: state.grid.getNodes(),
  }));
};
