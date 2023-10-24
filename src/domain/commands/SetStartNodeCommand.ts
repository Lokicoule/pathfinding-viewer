import { Command } from "../interfaces/Command";

export class SetStartNodeCommand extends Command {
  constructor(public readonly x: number, public readonly y: number) {
    super("SetStartNodeCommand");
  }
}
