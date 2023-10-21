import { Query } from "./Query";
import { Result } from "./Result";

export interface QueryHandler<TQuery extends Query, TResult extends Result> {
  handle(query: TQuery): TResult;
}
