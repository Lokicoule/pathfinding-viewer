import { Command } from "../interfaces/Command";
import { Vector } from "../valueObjects/Vector";

export class SetStartNodeCommand extends Command {
  constructor(public readonly vector: Vector) {
    super("SetStartNodeCommand");
  }
}
