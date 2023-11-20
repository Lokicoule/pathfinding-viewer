import { Command } from "@domain/interfaces/Command";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { Event } from "@domain/interfaces/Event";
import { EventHandler } from "@domain/interfaces/EventHandler";
import { Callback } from "@domain/types/Callback";
import { CommandBus, EventBus } from "../pubsub";

export class Mediator {
  private commandBus: CommandBus = new CommandBus();
  private eventBus: EventBus = new EventBus();

  public registerCommandHandler<TCommand extends Command>(
    commandName: string,
    handler: CommandHandler<TCommand> | Callback
  ) {
    return this.commandBus.subscribeCommand(commandName, handler);
  }

  public registerEventHandler<TEvent extends Event>(
    eventName: string,
    handler: EventHandler<TEvent> | Callback
  ) {
    return this.eventBus.subscribeEvent(eventName, handler);
  }

  public sendCommand<TCommand extends Command>(command: TCommand) {
    this.commandBus.publishCommand(command.type, command);
  }

  public sendEvent<TEvent extends Event>(event: TEvent) {
    this.eventBus.publishEvent(event.type, event);
  }
}
