import { Command } from "../../domain/interfaces/Command";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Event } from "../../domain/interfaces/Event";
import { EventHandler } from "../../domain/interfaces/EventHandler";
import { Callback } from "../../domain/types/Callback";

export class Mediator {
  private commandHandlers: Map<string, Array<CommandHandler<Command>>> =
    new Map();
  private eventHandlers: Map<string, Array<Callback | EventHandler<Event>>> =
    new Map();

  public registerCommandHandler<TCommand extends Command>(
    commandName: string,
    handler: CommandHandler<TCommand>
  ) {
    const handlers = this.commandHandlers.get(commandName);

    if (handlers) {
      handlers.push(handler);
    } else {
      this.commandHandlers.set(commandName, [handler]);
    }

    return () => this.unregisterCommandHandler(commandName, handler);
  }

  public registerEventHandler<TEvent extends Event>(
    eventName: string,
    handler: Callback | EventHandler<TEvent>
  ) {
    const handlers = this.eventHandlers.get(eventName);

    if (handlers) {
      handlers.push(handler);
    } else {
      this.eventHandlers.set(eventName, [handler]);
    }

    return () => this.unregisterEventHandler(eventName, handler);
  }

  public sendCommand<TCommand extends Command>(
    commandName: string,
    command: TCommand
  ) {
    const handlers = this.commandHandlers.get(commandName);

    if (handlers) {
      handlers.forEach((handler) => handler.execute(command));
    } else {
      throw new Error(`No handler registered for command: ${commandName}`);
    }
  }

  public sendEvent<TEvent extends Event>(eventName: string, event: TEvent) {
    const handlers = this.eventHandlers.get(eventName);

    if (handlers) {
      handlers.forEach((handler) => {
        if ((handler as EventHandler<Event>).handle) {
          (handler as EventHandler<Event>).handle(event);
        } else {
          (handler as Callback)(event);
        }
      });
    } else {
      throw new Error(`No handler registered for event: ${eventName}`);
    }
  }

  private unregisterCommandHandler<TCommand extends Command>(
    commandName: string,
    handler: CommandHandler<TCommand>
  ) {
    const handlers = this.commandHandlers.get(commandName);

    if (handlers) {
      const index = handlers.indexOf(handler);
      handlers.splice(index, 1);
    }
  }

  private unregisterEventHandler<TEvent extends Event>(
    eventName: string,
    handler: Callback | EventHandler<TEvent>
  ) {
    const handlers = this.eventHandlers.get(eventName);

    if (handlers) {
      const index = handlers.indexOf(handler);
      handlers.splice(index, 1);
    }
  }
}
