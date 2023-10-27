import { useStoreWithSelector } from "../../../adapters/store/hooks/useStoreWithSelector";
import { compositionRoot } from "../../../../bootstrapping/bootstrap";
import { GridStoreState } from "../GridStore";

export const useGrid = () => {
  return useStoreWithSelector<GridStoreState, GridStoreState["grid"]>(
    compositionRoot.stores.gridStore,
    (state) => state.grid
  );
};
