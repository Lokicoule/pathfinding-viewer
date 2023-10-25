import React, { createContext } from "react";
import Store from "../../../infrastructure/store/Store";

type StoreProviderProps = {
  stores: Record<string, Store<Record<string, unknown>>>;
  children: React.ReactNode;
};

type StoreProviderComponent = React.FC<
  React.PropsWithChildren<StoreProviderProps>
>;

export const StoreContext = createContext<Record<
  string,
  Store<Record<string, unknown>>
> | null>(null);

export const StoreProvider: StoreProviderComponent = ({ stores, children }) => {
  return (
    <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
  );
};
