import { useState } from "react";

function useStateMap<K, V>(initialMap = new Map<K, V>()) {
  const [map, setMap] = useState<Map<K, V>>(initialMap);

  const addEntry = (key: K, value: V) => {
    setMap(new Map(map).set(key, value));
  };

  const deleteEntry = (key: K) => {
    const newMap = new Map(map);
    newMap.delete(key);
    setMap(newMap);
  };

  const clearMap = () => {
    map.clear();
  };

  return {
    Map: map,
    addEntry,
    deleteEntry,
    clearMap,
  };
}

export default useStateMap;
