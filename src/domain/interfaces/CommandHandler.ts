import { Command } from "./Command";

export interface CommandHandler<TCommand extends Command> {
  handle(command: TCommand): void;
}
