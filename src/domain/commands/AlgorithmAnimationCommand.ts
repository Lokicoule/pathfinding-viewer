import { Node } from "../entities/Node";
import { Command } from "../interfaces/Command";

export class AlgorithmAnimationCommand extends Command {
  constructor(
    public readonly endNode: Node,
    public readonly visitedNodesInOrder: Node[]
  ) {
    super("AlgorithmAnimationCommand");
  }
}
