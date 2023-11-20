import { useSyncExternalStore } from "react";
import { Store, StoreState } from "../@infra/store/Store";

export const useStore = <T extends StoreState>(store: Store<T>): T => {
  const subscribe = (callback: () => void) => {
    return store.subscribe(callback);
  };

  const getSnapshot = () => {
    return store.getState();
  };

  return useSyncExternalStore(subscribe, getSnapshot) as T;
};
