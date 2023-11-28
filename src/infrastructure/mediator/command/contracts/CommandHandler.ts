import { ICommand } from "./Command";

export interface ICommandHandler<
  T extends ICommand = ICommand,
  ResultType = void
> {
  execute(command: T): ResultType;
}

export type CommandHandlerType =
  | ICommandHandler
  | (<ResultType>(command: ICommand) => ResultType);
