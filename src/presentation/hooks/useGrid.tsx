import { compositionRoot } from "../../bootstrapping/bootstrap";
import { GridStoreState } from "@infra/stores/GridStore";
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

/* import { useMemo } from 'react';

export const useGrid = () => {
  const gridStore = compositionRoot.stores.gridStore;
  const nodes = useStoreWithSelector(gridStore, state => state.grid.getNodes());

  return useMemo(() => ({ nodes }), [nodes]);
};
 */
