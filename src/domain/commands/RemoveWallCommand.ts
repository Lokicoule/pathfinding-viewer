import { Command } from "../interfaces/Command";
import { Vector } from "../valueObjects/Vector";

export class RemoveWallCommand extends Command {
  constructor(public readonly vector: Vector) {
    super("RemoveWallCommand");
  }
}
