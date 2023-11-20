import { Store, StoreState } from "@infra/store";
import { useStore } from "./useStore";

export const useStoreWithSelector = <T extends StoreState, R>(
  store: Store<T>,
  selector: (state: T) => R
): R => {
  const state = useStore<T>(store);
  return selector(state);
};
