import { QueryHandler, QueryHandlerType } from "../contracts/QueryHandler";
import { Query } from "../contracts/Query";
import { PubSub } from "../pubsub/PubSub";
import { Callback } from "../types/Callback";

export class QueryBus extends PubSub<string, QueryHandlerType<Query, unknown>> {
  public subscribeQuery(
    queryName: string,
    handler: QueryHandlerType<Query, unknown>
  ) {
    return this.subscribe(queryName, handler);
  }

  public async publishQuery<TReturn>(
    queryName: string,
    query: Query
  ): Promise<TReturn> {
    console.log("publishQuery", queryName, query);
    const result = await this.publish(queryName, query);

    return result as TReturn;
  }

  public applyMiddlewares(...middlewares: any[]) {
    for (const middleware of middlewares) {
      this.handlers.forEach((handlers, channel) => {
        this.handlers.set(
          channel,
          handlers.map((handler) => middleware(handler))
        );
      });
    }
  }

  public unsubscribeQuery(
    queryName: string,
    handler: QueryHandler<Query, unknown>
  ) {
    this.unsubscribe(queryName, handler);
  }

  protected async publish<TReturn>(
    channel: string,
    query: Query
  ): Promise<void | TReturn> {
    const handlers = this.handlers.get(channel);

    if (handlers) {
      for (const handler of handlers) {
        if (typeof handler === "function") {
          return (handler as Callback<TReturn>)(query);
        } else {
          return (handler as QueryHandler<Query, void | TReturn>).execute(
            query
          );
        }
      }
    }
  }
}
