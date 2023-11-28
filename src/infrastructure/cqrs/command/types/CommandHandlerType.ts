import { CommandContract } from "../contracts/CommandContract";
import { CommandHandlerContract } from "../contracts/CommandHandlerContract";

export type CommandHandlerType =
  | CommandHandlerContract
  | (<ResultType>(command: CommandContract) => ResultType);
