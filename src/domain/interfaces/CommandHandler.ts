import { Command } from "./Command";

export abstract class CommandHandler<TCommand extends Command> {
  abstract execute(command: TCommand): void;
}
