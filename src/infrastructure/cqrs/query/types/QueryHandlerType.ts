import { QueryContract } from "../contracts/QueryContract";
import { QueryHandlerContract } from "../contracts/QueryHandlerContract";

export type QueryHandlerType =
  | QueryHandlerContract
  | (<ResultType>(Query: QueryContract) => ResultType);
