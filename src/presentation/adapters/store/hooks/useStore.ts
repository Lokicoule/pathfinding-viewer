import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../StoreProvider";
import { useEventListener } from "../../mediator/hooks";

function useStores() {
  const stores = useContext(StoreContext);
  if (stores === null) {
    throw new Error("useStores must be used within a StoreProvider");
  }
  return stores;
}

function useStoreByName(storeName: string) {
  const stores = useStores();
  const store = stores[storeName];

  if (!store) {
    throw new Error(`Store with name ${storeName} not found`);
  }

  return store;
}

function useStore<T extends Record<string, unknown>>(
  storeName: string,
  eventName: string
): T {
  const subscribe = useEventListener();
  const store = useStoreByName(storeName);
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const handleChange = () => {
      setState({ ...store.getState() });
    };

    const unsubscribe = subscribe(eventName, handleChange);

    return () => {
      unsubscribe();
    };
  });

  return state as T;
}

export default useStore;
