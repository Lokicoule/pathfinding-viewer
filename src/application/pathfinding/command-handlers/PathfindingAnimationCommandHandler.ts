import { PathfindingAnimationCommand } from "../../../domain/commands/PathfindingAnimationCommand";
import { Node } from "../../../domain/entities/Node";
import { NodeType } from "../../../domain/enums/NodeType";
import { PathfindingAnimationCompletedEvent } from "../../../domain/events/PathfindingAnimationCompletedEvent";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { Mediator } from "../../../infrastructure/mediator/Mediator";
import { GridStore } from "../../../infrastructure/stores/GridStore";

export class PathfindingAnimationCommandHandler
  implements CommandHandler<PathfindingAnimationCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(command: PathfindingAnimationCommand): void {
    const shortestPath = this.getShortestPath(command.endNode);

    this.animateExploration(command.path).then(() => {
      this.animateShortestPath(shortestPath).then(() => {
        this.mediator.sendEvent(
          PathfindingAnimationCompletedEvent.name,
          new PathfindingAnimationCompletedEvent()
        );
      });
    });
  }

  private getShortestPath(endNode: Node): Node[] {
    const shortestPath: Node[] = [];
    let currentNode: Node | undefined = endNode;

    while (currentNode && !currentNode.isStart()) {
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

          if (!node.isStart() && !node.isEnd())
            this.gridStore.setNodeAs(node.getVector(), NodeType.Explored);

          if (i === visitedNodesInOrder.length - 1) resolve();
        }, 20 * i);
      }
    });
  }

  private animateShortestPath(shortestPath: Node[]): Promise<void> {
    return new Promise((resolve) => {
      let lastNode = shortestPath[0];

      for (let i = 1; i < shortestPath.length; i++) {
        setTimeout(() => {
          const node = shortestPath[i];
          this.gridStore.setNodeAs(lastNode.getVector(), NodeType.Path);

          if (!node.isStart() && !node.isEnd()) {
            this.gridStore.setNodeAs(node.getVector(), NodeType.Start);
          }

          lastNode = node;

          if (i === shortestPath.length - 1) resolve();
        }, 50 * i);
      }
    });
  }
}
