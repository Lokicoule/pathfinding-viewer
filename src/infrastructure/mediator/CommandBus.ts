import { Command } from "../../domain/interfaces/Command";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { PubSub } from "../pubsub/PubSub";

export class CommandBus extends PubSub<string, CommandHandler<Command>> {
  public subscribeCommand<TCommand extends Command>(
    commandName: string,
    handler: CommandHandler<TCommand>
  ) {
    this.subscribe(commandName, handler);
  }

  public publishCommand<TCommand extends Command>(
    commandName: string,
    command: TCommand
  ) {
    this.publish(commandName, command);
  }

  public unsubscribeCommand<TCommand extends Command>(
    commandName: string,
    handler: CommandHandler<TCommand>
  ) {
    this.unsubscribe(commandName, handler);
  }
}
