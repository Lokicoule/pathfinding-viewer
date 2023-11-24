import { Command } from "..";
import {
  CommandHandler,
  CommandHandlerType,
} from "../contracts/CommandHandler";
import { PubSub } from "../pubsub/PubSub";
import { Callback } from "../types/Callback";

export class CommandBus extends PubSub<string, CommandHandlerType> {
  public subscribeCommand(commandName: string, handler: CommandHandlerType) {
    return this.subscribe(commandName, handler);
  }

  public async publishCommand<TResult>(
    commandName: string,
    command: Command
  ): Promise<TResult> {
    console.log("publishCommand", commandName, command);
    const result = await this.publish(commandName, command);

    return result as TResult;
  }

  public unsubscribeCommand(commandName: string, handler: CommandHandler) {
    this.unsubscribe(commandName, handler);
  }

  public applyMiddlewares(...middlewares: any[]) {
    for (const middleware of middlewares) {
      this.handlers.forEach((handlers, channel) => {
        this.handlers.set(
          channel,
          handlers.map((handler) => middleware(handler))
        );
      });
    }
  }

  private async publish<TResult>(
    channel: string,
    command: Command
  ): Promise<void | TResult> {
    const handlers = this.handlers.get(channel);

    if (handlers) {
      for (const handler of handlers) {
        if (typeof handler === "function") {
          return (handler as Callback<TResult>)(command);
        } else {
          return (handler as CommandHandler).execute(command);
        }
      }
    }
  }
}
