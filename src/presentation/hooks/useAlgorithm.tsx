import { AlgorithmUpdatedEvent } from "@/domain/algorithm/events/AlgorithmUpdatedEvent";
import { GetAlgorithmQuery } from "@/domain/algorithm/queries/GetAlgorithmQuery";
import { useEventListener } from "../adapters/mediator/hooks";
import { QueryResult, useQuery } from "../adapters/mediator/hooks/useQuery";
import { getInitialAlgorithm } from "../helpers/algorithm";
import { AlgorithmViewModel } from "../viewModels/AlgorithmViewModel";
import { Algorithm } from "@/domain/algorithm";
import { useState } from "react";

export const useAlgorithm = () => {
  const [query, callback] = useQuery<GetAlgorithmQuery, Algorithm>(
    new GetAlgorithmQuery()
  );
  useEventListener(AlgorithmUpdatedEvent, callback);

  return {
    algorithm: query.result,
    loading: query.loading,
    error: query.error,
  };
};

export const useGetInitialAlgorithm = (algorithms: AlgorithmViewModel[]) => {
  const [result, setResult] = useState<QueryResult<AlgorithmViewModel>>({
    result: null,
    loading: false,
    error: null,
  });
  const [queryResult] = useQuery<GetAlgorithmQuery, Algorithm>(
    new GetAlgorithmQuery()
  );

  try {
    setResult((prev) => ({ ...prev, loading: true }));

    if (queryResult.result) {
      setResult({
        loading: false,
        error: null,
        result: getInitialAlgorithm(algorithms, queryResult.result.value),
      });
    }
  } catch (error) {
    setResult((prev) => ({
      ...prev,
      error: error instanceof Error ? error : new Error("Unknown error"),
      loading: false,
    }));
  }

  return [result];
};
