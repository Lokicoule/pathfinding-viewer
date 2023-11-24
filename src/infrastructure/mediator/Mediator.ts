import { CommandBus } from "./bus/CommandBus";
import { EventBus } from "./bus/EventBus";
import { QueryBus } from "./bus/QueryBus";
import { Command } from "./contracts/Command";
import { CommandHandlerType } from "./contracts/CommandHandler";
import { Event } from "./contracts/Event";
import { EventHandlerType } from "./contracts/EventHandler";
import { Query } from "./contracts/Query";
import { QueryHandler } from "./contracts/QueryHandler";

export class Mediator {
  private commandBus: CommandBus = new CommandBus();
  private eventBus: EventBus = new EventBus();
  private queryBus: QueryBus = new QueryBus();

  public registerCommandHandler(
    commandName: string,
    handler: CommandHandlerType
  ) {
    return this.commandBus.subscribeCommand(commandName, handler);
  }

  public registerEventHandler(
    eventName: string,
    handler: EventHandlerType<Event>
  ) {
    return this.eventBus.subscribeEvent(eventName, handler);
  }

  public registerQueryHandler(
    queryName: string,
    handler: QueryHandler<Query, unknown>
  ) {
    return this.queryBus.subscribeQuery(queryName, handler);
  }

  public sendCommand<TReturn>(command: Command): Promise<TReturn> {
    return this.commandBus.publishCommand(command.type, command);
  }

  public sendEvent(event: Event) {
    this.eventBus.publishEvent(event.type, event);
  }

  public sendQuery<TReturn>(query: Query): Promise<TReturn> {
    return this.queryBus.publishQuery(query.type, query);
  }

  public applyMiddlewares(...middlewares: any[]) {
    this.commandBus.applyMiddlewares(...middlewares);
    this.eventBus.applyMiddlewares(...middlewares);
    this.queryBus.applyMiddlewares(...middlewares);
  }
}
