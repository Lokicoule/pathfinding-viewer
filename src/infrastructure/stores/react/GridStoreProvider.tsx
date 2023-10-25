import { useEffect, useState } from "react";
import { Node } from "../../../domain/entities/Node";
import { RenderedEvent } from "../../../domain/events/RenderedEvent";
import { useEventListener } from "../../../presentation/adapters/mediator/hooks/useEventListener";
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
  const [grid, setGrid] = useState<Node[][]>(store.getGrid());

  const { on } = useEventListener();

  useEffect(() => {
    const off = on(RenderedEvent.name, () => {
      setGrid([...store.getGrid()]);
    });

    return () => {
      off();
    };
  });

  return (
    <GridStoreContext.Provider value={grid}>
      {children}
    </GridStoreContext.Provider>
  );
};
