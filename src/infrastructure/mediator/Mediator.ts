import { Command } from "../../domain/interfaces/Command";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Event } from "../../domain/interfaces/Event";
import { EventHandler } from "../../domain/interfaces/EventHandler";
import { Callback } from "../../domain/types/Callback";
import { CommandBus } from "./CommandBus";
import { EventBus } from "./EventBus";

export class Mediator {
  private commandBus: CommandBus = new CommandBus();
  private eventBus: EventBus = new EventBus();

  public registerCommandHandler<TCommand extends Command>(
    commandName: string,
    handler: CommandHandler<TCommand>
  ) {
    this.commandBus.subscribeCommand(commandName, handler);

    return () => this.unregisterCommandHandler(commandName, handler);
  }

  public registerEventHandler<TEvent extends Event>(
    eventName: string,
    handler: EventHandler<TEvent> | Callback
  ) {
    this.eventBus.subscribeEvent(eventName, handler);

    return () => this.unregisterEventHandler(eventName, handler);
  }

  public sendCommand<TCommand extends Command>(
    commandName: string,
    command: TCommand
  ) {
    this.commandBus.publishCommand(commandName, command);
  }

  public sendEvent<TEvent extends Event>(eventName: string, event: TEvent) {
    this.eventBus.publishEvent(eventName, event);
  }

  private unregisterCommandHandler<TCommand extends Command>(
    commandName: string,
    handler: CommandHandler<TCommand>
  ) {
    this.commandBus.unsubscribeCommand(commandName, handler);
  }

  private unregisterEventHandler<TEvent extends Event>(
    eventName: string,
    handler: EventHandler<TEvent> | Callback
  ) {
    this.eventBus.unsubscribeEvent(eventName, handler);
  }
}
