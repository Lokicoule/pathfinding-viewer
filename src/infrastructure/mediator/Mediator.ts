import { Command } from "@domain/interfaces/Command";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { Event } from "@domain/interfaces/Event";
import { EventHandler } from "@domain/interfaces/EventHandler";
import { Callback } from "@domain/types/Callback";
import { CommandBus, EventBus } from "../pubsub";

export class Mediator {
  private commandBus: CommandBus = new CommandBus();
  private eventBus: EventBus = new EventBus();

  public registerCommandHandler(
    commandName: string,
    handler: CommandHandler<Command> | Callback
  ) {
    return this.commandBus.subscribeCommand(commandName, handler);
  }

  public registerEventHandler(
    eventName: string,
    handler: EventHandler<Event> | Callback
  ) {
    return this.eventBus.subscribeEvent(eventName, handler);
  }

  public sendCommand(command: Command) {
    this.commandBus.publishCommand(command.type, command);
  }

  public sendEvent(event: Event) {
    this.eventBus.publishEvent(event.type, event);
  }
}
