import { Command } from "../interfaces/Command";

export class AddWallCommand implements Command {
  public readonly type = AddWallCommand.name;

  constructor(public readonly x: number, public readonly y: number) {}
}
