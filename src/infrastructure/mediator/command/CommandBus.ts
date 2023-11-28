import { Unsubscribe } from "../types/Unsubscribe";
import { CommandAlreadyRegisteredException } from "./exceptions/CommandAlreadyRegisteredException";
import { CommandNotFoundException } from "./exceptions/CommandNotFoundException";
import { ICommand } from "./contracts/Command";
import { CommandHandlerType } from "./contracts/CommandHandler";

export class CommandBus {
  private commands: Map<string, CommandHandlerType> = new Map();

  register(command: ICommand, handler: CommandHandlerType): Unsubscribe {
    const identifier = command.commandName;
    console.log("register", identifier, handler);
    if (this.commands.has(identifier)) {
      throw new CommandAlreadyRegisteredException(identifier);
    }

    this.commands.set(identifier, handler);

    return () => {
      this.commands.delete(identifier);
    };
  }

  execute<ResultType>(command: ICommand): ResultType {
    const identifier = command.commandName;
    console.log("execute", identifier, command);
    const handler = this.commands.get(identifier);

    if (!handler) {
      throw new CommandNotFoundException(identifier);
    }

    if (typeof handler === "function") {
      return handler(command);
    }

    return handler.execute(command) as ResultType;
  }
}
