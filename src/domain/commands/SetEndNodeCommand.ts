import { Command } from "../interfaces/Command";

export class SetEndNodeCommand extends Command {
  constructor(public readonly x: number, public readonly y: number) {
    super("SetEndNodeCommand");
  }
}
