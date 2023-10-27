import { useSyncExternalStore } from "react";
import { Store, StoreState } from "../../../../infrastructure/store/Store";

export const useStore = <T extends StoreState>(store: Store<StoreState>): T => {
  const subscribe = (callback: () => void) => {
    return store.subscribe(callback);
  };

  const getSnapshot = () => {
    return store.getState();
  };

  return useSyncExternalStore(subscribe, getSnapshot) as T;
};

export const useStoreWithSelector = <T extends StoreState, R>(
  store: Store<T>,
  selector: (state: T) => R
): R => {
  const state = useStore<T>(store);
  return selector(state);
};
