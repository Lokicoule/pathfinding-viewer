import { AlgorithmAnimationCommand } from "../../domain/commands/AlgorithmAnimationCommand";
import { Node } from "../../domain/entities/Node";
import { NodeType } from "../../domain/enums/NodeType";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Mediator } from "../mediator/Mediator";
import { GridStore } from "../stores/GridStore";

export class AlgorithmAnimationCommandHandler
  implements CommandHandler<AlgorithmAnimationCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(command: AlgorithmAnimationCommand): void {
    const shortestPath = this.getShortestPath(command.endNode);

    this.animateExploration(command.visitedNodesInOrder).then(() => {
      this.animateShortestPath(shortestPath);
    });
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

  private animateExploration(visitedNodesInOrder: Node[]): Promise<void> {
    return new Promise((resolve) => {
      for (let i = 0; i < visitedNodesInOrder.length; i++) {
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          if (
            node.getType() !== NodeType.Start &&
            node.getType() !== NodeType.End
          )
            this.gridStore.setNodeAs(node.getVector(), NodeType.Explored);
          if (i === visitedNodesInOrder.length - 1) resolve();
        }, 10 * i);
      }
    });
  }

  private animateShortestPath(shortestPath: Node[]): Promise<void> {
    return new Promise((resolve) => {
      for (let i = 0; i < shortestPath.length; i++) {
        setTimeout(() => {
          const node = shortestPath[i];
          if (
            node.getType() !== NodeType.Start &&
            node.getType() !== NodeType.End
          )
            this.gridStore.setNodeAs(node.getVector(), NodeType.Path);
          if (i === shortestPath.length - 1) resolve();
        }, 50 * i);
      }
    });
  }
}
