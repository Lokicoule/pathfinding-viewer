import { Callback } from "../types";
import { Command } from "./Command";

export interface CommandHandler {
  execute<TReturn>(command: Command): TReturn | void | Promise<TReturn | void>;
}

export type CommandHandlerType = CommandHandler | Callback<unknown>;
