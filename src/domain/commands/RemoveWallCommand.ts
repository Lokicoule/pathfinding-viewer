import { Command } from "../interfaces/Command";

export class RemoveWallCommand extends Command {
  constructor(public readonly x: number, public readonly y: number) {
    super("RemoveWallCommand");
  }
}
