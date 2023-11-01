import { Node } from "../entities/Node";
import { Command } from "../interfaces/Command";

export class MazeAlgorithmAnimationCommand extends Command {
  constructor(public readonly wallsInOrder: Node[]) {
    super("MazeAlgorithmAnimationCommand");
  }
}
