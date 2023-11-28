import { CommandBus } from "../cqrs/command/CommandBus";
import { CommandContract } from "../cqrs/command/contracts";
import { CommandHandlerType } from "../cqrs/command/types/CommandHandlerType";
import { EventBus } from "../cqrs/event/EventBus";
import { EventContract } from "../cqrs/event/contracts";
import {
  EventHandlerType,
  EventHandlerTypeGeneric,
} from "../cqrs/event/types/EventHandlerType";
import { QueryBus } from "../cqrs/query/QueryBus";
import { QueryContract } from "../cqrs/query/contracts";
import { QueryHandlerType } from "../cqrs/query/types/QueryHandlerType";

export class Mediator {
  private commandBus: CommandBus = new CommandBus();
  private eventBus: EventBus = new EventBus();
  private queryBus: QueryBus = new QueryBus();

  public registerCommandHandler(
    command: CommandContract,
    handler: CommandHandlerType
  ) {
    return this.commandBus.register(command, handler);
  }

  public registerEventHandler<EventType extends EventContract = EventContract>(
    eventName: EventContract,
    handler: EventHandlerTypeGeneric<EventType>
  ) {
    return this.eventBus.register(eventName, handler as EventHandlerType);
  }

  public registerQueryHandler(
    queryName: QueryContract,
    handler: QueryHandlerType
  ) {
    return this.queryBus.register(queryName, handler);
  }

  public sendCommand<TReturn>(command: CommandContract): Promise<TReturn> {
    return this.commandBus.execute(command);
  }

  public sendEvent(event: EventContract) {
    this.eventBus.handle(event);
  }

  public sendQuery<TReturn>(query: QueryContract): Promise<TReturn> {
    return this.queryBus.execute(query);
  }
}
