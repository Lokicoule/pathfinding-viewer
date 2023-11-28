import { QueryContract } from "./QueryContract";

export interface QueryHandlerContract<
  T extends QueryContract = QueryContract,
  ResultType = void
> {
  execute(Query: T): ResultType;
}
