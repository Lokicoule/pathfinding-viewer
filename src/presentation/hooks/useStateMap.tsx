import { useRef } from "react";

function useStateMap<K, V>(initialMap = new Map<K, V>()) {
  const map = useRef<Map<K, V>>(initialMap);

  const addEntry = (key: K, value: V) => {
    map.current.set(key, value);
  };

  const deleteEntry = (key: K) => {
    map.current.delete(key);
  };

  const clearMap = () => {
    map.current.clear();
  };

  return {
    Map: map.current,
    addEntry,
    deleteEntry,
    clearMap,
  };
}

export default useStateMap;
