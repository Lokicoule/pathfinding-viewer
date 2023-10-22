import { Command } from "../../domain/interfaces/Command";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Event } from "../../domain/interfaces/Event";
import { EventHandler } from "../../domain/interfaces/EventHandler";

export class Mediator {
  private commandHandlers: Map<string, Array<CommandHandler<Command>>> =
    new Map();
  private eventHandlers: Map<string, Array<EventHandler>> = new Map();

  registerCommandHandler<TCommand extends Command>(
    commandName: string,
    handler: CommandHandler<TCommand>
  ) {
    const handlers = this.commandHandlers.get(commandName);

    if (handlers) {
      handlers.push(handler);
    } else {
      this.commandHandlers.set(commandName, [handler]);
    }
  }

  registerEventHandler(eventName: string, handler: EventHandler) {
    const handlers = this.eventHandlers.get(eventName);

    if (handlers) {
      handlers.push(handler);
    } else {
      this.eventHandlers.set(eventName, [handler]);
    }
  }

  sendCommand<TCommand extends Command>(
    commandName: string,
    command: TCommand
  ) {
    const handlers = this.commandHandlers.get(commandName);

    if (handlers) {
      handlers.forEach((handler) => handler.handle(command));
    } else {
      throw new Error(`No handler registered for command: ${commandName}`);
    }
  }

  sendEvent<TEvent extends Event>(eventName: string, event: TEvent) {
    const handlers = this.eventHandlers.get(eventName);

    if (handlers) {
      handlers.forEach((handler) => handler(event));
    } else {
      throw new Error(`No handler registered for event: ${eventName}`);
    }
  }

  unregisterCommandHandler(commandName: string) {
    this.commandHandlers.delete(commandName);
  }

  unregisterEventHandler(eventName: string) {
    this.eventHandlers.delete(eventName);
  }
}
