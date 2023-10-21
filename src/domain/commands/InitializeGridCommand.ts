import { Command } from "../interfaces/Command";

export class InitializeGridCommand implements Command {
  public readonly type = InitializeGridCommand.name;

  constructor(public readonly width: number, public readonly height: number) {}
}
