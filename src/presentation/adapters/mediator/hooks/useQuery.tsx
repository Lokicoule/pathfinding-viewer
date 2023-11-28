import { useCallback, useEffect, useRef, useState } from "react";

import { QueryContract } from "@infra/cqrs";
import { useMediator } from "./useMediator";

export type QueryResult<TResult> = {
  result: TResult | null;
  loading: boolean;
  error: Error | null;
};

export function useQuery<TQuery extends QueryContract, TResult>(
  query: TQuery
): [QueryResult<TResult>, () => void] {
  const mountedRef = useRef(false);
  const [result, setResult] = useState<QueryResult<TResult>>({
    result: null,
    loading: false,
    error: null,
  });
  const mediator = useMediator();

  const executeQuery = useCallback(async () => {
    try {
      setResult((prev) => ({ ...prev, loading: true }));
      const queryResult = await mediator.sendQuery<TResult>(query);
      if (mountedRef.current) {
        setResult((prev) => ({
          ...prev,
          result: queryResult,
          loading: false,
        }));
      }
    } catch (error) {
      if (mountedRef.current) {
        setResult((prev) => ({
          ...prev,
          error: error instanceof Error ? error : new Error("Unknown error"),
          loading: false,
        }));
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    executeQuery();
    return () => {
      mountedRef.current = false;
    };
  }, [executeQuery]);

  return [result, executeQuery];
}
