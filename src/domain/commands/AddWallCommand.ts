import { Command } from "../interfaces/Command";
import { Vector } from "../valueObjects/Vector";

export class AddWallCommand extends Command {
  constructor(public readonly vector: Vector) {
    super("AddWallCommand");
  }
}
