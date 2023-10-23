import { useEffect, useState } from "react";
import { Node } from "../../../domain/entities/Node";
import { RenderedEvent } from "../../../domain/events/RenderedEvent";
import { useEventListener } from "../../mediator/react/hooks/useEventListener";
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

  const { on, off } = useEventListener();

  useEffect(() => {
    on(RenderedEvent.name, () => {
      setGrid([...store.getGrid()]);
    });

    return () => {
      off(RenderedEvent.name);
    };
  }, [on, off, store]);

  return (
    <GridStoreContext.Provider value={grid}>
      {children}
    </GridStoreContext.Provider>
  );
};
