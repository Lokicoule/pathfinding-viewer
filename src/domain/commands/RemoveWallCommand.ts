import { Command } from "../interfaces/Command";

export class RemoveWallCommand implements Command {
  public readonly type = RemoveWallCommand.name;

  constructor(public readonly x: number, public readonly y: number) {}
}
