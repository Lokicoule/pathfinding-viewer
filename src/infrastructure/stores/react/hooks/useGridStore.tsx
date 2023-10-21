// GridStoreContext.js
import { useContext } from "react";
import { GridStoreContext } from "../GridStoreContext";

export const useGridStore = () => {
  const gridStore = useContext(GridStoreContext);

  if (!gridStore) {
    throw new Error("useGridStore must be used within a GridStoreProvider");
  }

  return gridStore;
};
