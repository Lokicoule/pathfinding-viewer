import { Command } from "../interfaces/Command";

export class SetEndNodeCommand implements Command {
  public readonly type = SetEndNodeCommand.name;

  constructor(public readonly x: number, public readonly y: number) {}
}
