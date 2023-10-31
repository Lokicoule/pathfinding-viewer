import { AnimateShortestPathCommand } from "../../domain/commands/AnimateShortestPathCommand";
import { Node } from "../../domain/entities/Node";
import { NodeType } from "../../domain/enums/NodeType";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Mediator } from "../mediator/Mediator";
import { GridStore } from "../stores/GridStore";

export class AnimateShortestPathCommandHandler
  implements CommandHandler<AnimateShortestPathCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(command: AnimateShortestPathCommand): void {
    console.log("AnimateShortestPathCommandHandler", command);
    const shortestPath = this.getShortestPath(command.endNode);
    this.animateShortestPath(shortestPath);
  }

  private getShortestPath(endNode: Node): Node[] {
    const shortestPath: Node[] = [];
    let currentNode: Node | undefined = endNode;

    while (currentNode && currentNode.getType() !== NodeType.Start) {
      shortestPath.unshift(currentNode);

      currentNode = currentNode.getPreviousNode();
    }

    return shortestPath;
  }

  private animateShortestPath(shortestPath: Node[]): void {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        if (
          node.getType() !== NodeType.Start &&
          node.getType() !== NodeType.End
        )
          this.gridStore.setNodeAs(node.getVector(), NodeType.Path);
      }, 50 * i);
    }
  }
}
