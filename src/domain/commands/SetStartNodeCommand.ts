import { Command } from "../interfaces/Command";

export class SetStartNodeCommand implements Command {
  public readonly type = SetStartNodeCommand.name;

  constructor(public readonly x: number, public readonly y: number) {}
}
