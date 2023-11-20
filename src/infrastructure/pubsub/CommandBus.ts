import { Command } from "@domain/interfaces/Command";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { Callback } from "@domain/types/Callback";
import { PubSub } from "./PubSub";

export class CommandBus extends PubSub<
  string,
  CommandHandler<Command> | Callback
> {
  public subscribeCommand<TCommand extends Command>(
    commandName: string,
    handler: CommandHandler<TCommand> | Callback
  ) {
    return this.subscribe(commandName, handler);
  }

  public publishCommand<TCommand extends Command>(
    commandName: string,
    command: TCommand | Callback
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
