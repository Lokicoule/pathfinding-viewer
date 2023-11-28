import { Unsubscribe } from "../shared/types/Unsubscribe";
import { CommandContract } from "./contracts/CommandContract";
import { CommandAlreadyRegisteredException } from "./exceptions/CommandAlreadyRegisteredException";
import { CommandNotFoundException } from "./exceptions/CommandNotFoundException";
import { CommandHandlerType } from "./types/CommandHandlerType";

export class CommandBus {
  private commands: Map<string, CommandHandlerType> = new Map();

  register(command: CommandContract, handler: CommandHandlerType): Unsubscribe {
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

  execute<ResultType>(command: CommandContract): ResultType {
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
