import { useState } from "react";

function useStateMap<K, V>(initialMap = new Map<K, V>()) {
  const [map, setMap] = useState<Map<K, V>>(initialMap);

  const addEntry = (key: K, value: V) => {
    setMap((prevMap) => new Map(prevMap).set(key, value));
  };

  const deleteEntry = (key: K) => {
    setMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(key);
      return newMap;
    });
  };

  const clearMap = () => {
    setMap(new Map());
  };

  return {
    Map: map,
    addEntry,
    deleteEntry,
    clearMap,
  };
}

export default useStateMap;
