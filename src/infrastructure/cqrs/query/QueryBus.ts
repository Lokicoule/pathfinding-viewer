import { Unsubscribe } from "../shared/types/Unsubscribe";
import { QueryContract } from "./contracts/QueryContract";
import { QueryAlreadyRegisteredException } from "./exceptions/QueryAlreadyRegisteredException";
import { QueryNotFoundException } from "./exceptions/QueryNotFoundException";
import { QueryHandlerType } from "./types/QueryHandlerType";

export class QueryBus {
  private queries: Map<string, QueryHandlerType> = new Map();

  register(query: QueryContract, handler: QueryHandlerType): Unsubscribe {
    const identifier = query.queryName;
    if (this.queries.has(identifier)) {
      throw new QueryAlreadyRegisteredException(identifier);
    }

    this.queries.set(identifier, handler);

    return () => {
      this.queries.delete(identifier);
    };
  }

  execute<ResultType>(query: QueryContract): ResultType {
    const identifier = query.queryName;
    const handler = this.queries.get(identifier);

    if (!handler) {
      throw new QueryNotFoundException(identifier);
    }

    if (typeof handler === "function") {
      return handler(query);
    }

    return handler.execute(query) as ResultType;
  }
}
