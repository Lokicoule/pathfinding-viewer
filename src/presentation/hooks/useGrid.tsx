import { useMemo } from "react";
import { compositionRoot } from "../../bootstrapping/bootstrap";
import { useStoreWithSelector } from "../adapters/store/hooks/useStoreWithSelector";

export const useGrid = () => {
  const gridStore = compositionRoot.stores.gridStore;
  const nodes = useStoreWithSelector(gridStore, (state) =>
    state.grid.getNodes()
  );

  return useMemo(() => ({ nodes }), [nodes]);
};
