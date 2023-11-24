import { Callback } from "..";
import { Query } from "./Query";

export interface QueryHandler<T extends Query, TReturn> {
  execute: (query: T) => TReturn;
}

export type QueryHandlerFunction<T extends Query, TReturn> = (
  query: T
) => TReturn;

export type QueryHandlerType<T extends Query, TReturn> =
  | QueryHandler<T, TReturn>
  | Callback<unknown>;

/* 

export interface QueryHandlerWithCallback<T extends Query> {
  execute<TReturn>(query: T, callback: (result: TReturn) => void): void;
}

export interface QueryHandlerAsync<T extends Query> {
  executeAsync<TReturn>(query: T): Promise<TReturn>;
}

export interface QueryHandlerAsyncWithCallback<T extends Query> {
  executeAsync<TReturn>(
    query: T,
    callback: (result: TReturn) => void
  ): Promise<void>;
}

export type QueryHandlerType<T extends Query> =
  | QueryHandler<T>
  | QueryHandlerWithCallback<T>
  | QueryHandlerAsync<T>
  | QueryHandlerAsyncWithCallback<T>;
 */
