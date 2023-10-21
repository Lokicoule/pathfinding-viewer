import { Query } from "../../../../domain/interfaces/Query";
import { Result } from "../../../../domain/interfaces/Result";
import { useMediator } from "./useMediator";

export function useQuery<TQuery extends Query, TResult extends Result>(
  queryName: string
) {
  const mediator = useMediator();

  return (query: TQuery) => {
    return mediator.sendQuery<TQuery, TResult>(queryName, query);
  };
}
