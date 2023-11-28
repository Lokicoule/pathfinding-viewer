import { CommandContract } from "./CommandContract";

export interface CommandHandlerContract<
  T extends CommandContract = CommandContract,
  ResultType = void
> {
  execute(command: T): ResultType;
}
