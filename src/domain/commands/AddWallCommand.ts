import { Command } from "../interfaces/Command";

export class AddWallCommand extends Command {
  constructor(public readonly x: number, public readonly y: number) {
    super("AddWallCommand");
  }
}
