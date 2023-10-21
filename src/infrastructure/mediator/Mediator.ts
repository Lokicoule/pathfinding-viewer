import { Command } from "../../domain/interfaces/Command";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Query } from "../../domain/interfaces/Query";
import { QueryHandler } from "../../domain/interfaces/QueryHandler";
import { Result } from "../../domain/interfaces/Result";

export class Mediator {
  private commandHandlers: Map<string, CommandHandler<Command>> = new Map();
  private queryHandlers: Map<string, QueryHandler<Query, Result>> = new Map();

  registerCommandHandler<TCommand extends Command>(
    commandName: string,
    handler: CommandHandler<TCommand>
  ) {
    this.commandHandlers.set(commandName, handler);

    console.log("registerCommandHandler", this.commandHandlers);
  }

  registerQueryHandler<TQuery extends Query, TResult extends Result>(
    queryName: string,
    handler: QueryHandler<TQuery, TResult>
  ) {
    this.queryHandlers.set(queryName, handler);
  }

  sendCommand<TCommand extends Command>(
    commandName: string,
    command: TCommand
  ) {
    const handler = this.commandHandlers.get(commandName);

    console.log(
      "sendCommand",
      commandName,
      command,
      handler,
      this.commandHandlers
    );
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

  unregisterCommandHandler(commandName: string) {
    this.commandHandlers.delete(commandName);
  }

  unregisterQueryHandler(queryName: string) {
    this.queryHandlers.delete(queryName);
  }
}
