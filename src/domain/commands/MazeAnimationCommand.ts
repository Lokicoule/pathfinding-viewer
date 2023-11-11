import { Node } from "../entities/Node";
import { Command } from "../interfaces/Command";

export class MazeAnimationCommand extends Command {
  constructor(public readonly wallsInOrder: Node[]) {
    super("MazeAnimationCommand");
  }
}
