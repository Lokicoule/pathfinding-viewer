import { Command } from "../interfaces/Command";
import { Vector } from "../valueObjects/Vector";

export class SetEndNodeCommand extends Command {
  constructor(public readonly vector: Vector) {
    super("SetEndNodeCommand");
  }
}
