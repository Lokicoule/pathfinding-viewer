import { Algorithm } from "@/domain/algorithm";
import { AlgorithmUpdatedEvent } from "@/domain/algorithm/events/AlgorithmUpdatedEvent";
import { GetAlgorithmQuery } from "@/domain/algorithm/queries/GetAlgorithmQuery";
import { useEventListener } from "../adapters/mediator/hooks";
import { useQuery } from "../adapters/mediator/hooks/useQuery";

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
