import { Command } from "../../domain/interfaces/Command";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Event } from "../../domain/interfaces/Event";
import { EventHandler } from "../../domain/interfaces/EventHandler";
import { Query } from "../../domain/interfaces/Query";
import { QueryHandler } from "../../domain/interfaces/QueryHandler";
import { Result } from "../../domain/interfaces/Result";

export class Mediator {
  private commandHandlers: Map<string, CommandHandler<Command>> = new Map();
  private queryHandlers: Map<string, QueryHandler<Query, Result>> = new Map();
  private eventHandlers: Map<string, Array<EventHandler>> = new Map();

  registerCommandHandler<TCommand extends Command>(
    commandName: string,
    handler: CommandHandler<TCommand>
  ) {
    this.commandHandlers.set(commandName, handler);
  }

  registerQueryHandler<TQuery extends Query, TResult extends Result>(
    queryName: string,
    handler: QueryHandler<TQuery, TResult>
  ) {
    this.queryHandlers.set(queryName, handler);
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
    const handler = this.commandHandlers.get(commandName);

    if (handler) {
      handler.handle(command);
    } else {
      throw new Error(`No handler registered for command: ${commandName}`);
    }
  }

  sendQuery<TQuery extends Query, TResult extends Result>(
    queryName: string,
    query: TQuery
  ): TResult {
    const handler = this.queryHandlers.get(queryName);

    if (handler) {
      return handler.handle(query) as TResult;
    } else {
      throw new Error(`No handler registered for query: ${queryName}`);
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

  unregisterQueryHandler(queryName: string) {
    this.queryHandlers.delete(queryName);
  }

  unregisterEventHandler(eventName: string) {
    this.eventHandlers.delete(eventName);
  }
}
