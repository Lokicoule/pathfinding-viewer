import React, { createContext } from "react";
import Store from "./Store";

type StoreProviderProps = {
  stores: Record<string, Store<Record<string, unknown>>>;
  children: React.ReactNode;
};

const StoreContext = createContext<Record<
  string,
  Store<Record<string, unknown>>
> | null>(null);

function StoreProvider({ stores, children }: StoreProviderProps) {
  return (
    <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
  );
}

export { StoreContext, StoreProvider };
