import { EventBus } from "./bus/EventBus";
import { QueryBus } from "./bus/QueryBus";
import { CommandBus } from "./command/CommandBus";
import { ICommand } from "./command/contracts/Command";
import { CommandHandlerType } from "./command/contracts/CommandHandler";
import { Event } from "./contracts/Event";
import { EventHandlerType } from "./contracts/EventHandler";
import { Query } from "./contracts/Query";
import { QueryHandler } from "./contracts/QueryHandler";

export class Mediator {
  private commandBus: CommandBus = new CommandBus();
  private eventBus: EventBus = new EventBus();
  private queryBus: QueryBus = new QueryBus();

  public registerCommandHandler(
    command: ICommand,
    handler: CommandHandlerType
  ) {
    return this.commandBus.register(command, handler);
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

  public sendCommand<TReturn>(command: ICommand): Promise<TReturn> {
    return this.commandBus.execute(command);
  }

  public sendEvent(event: Event) {
    this.eventBus.publishEvent(event.type, event);
  }

  public sendQuery<TReturn>(query: Query): Promise<TReturn> {
    return this.queryBus.publishQuery(query.type, query);
  }
}
