import { GridStore } from "../GridStore";
import { GridStoreContext } from "./GridStoreContext";

type GridStoreProviderProps = {
  store: GridStore;
};

type GridStoreProviderComponent = React.FC<
  React.PropsWithChildren<GridStoreProviderProps>
>;

export const GridStoreProvider: GridStoreProviderComponent = ({
  children,
  store,
}) => {
  return (
    <GridStoreContext.Provider value={store}>
      {children}
    </GridStoreContext.Provider>
  );
};
