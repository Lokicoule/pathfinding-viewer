import { PathfindingAnimationCommand } from "../../../domain/commands/PathfindingAnimationCommand";
import { Node } from "../../../domain/entities/Node";
import { NodeType } from "../../../domain/enums/NodeType";
import { PathfindingAnimationCompletedEvent } from "../../../domain/events/PathfindingAnimationCompletedEvent";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { AnimationController } from "../../../infrastructure/controllers/AnimationController";
import { Mediator } from "../../../infrastructure/mediator/Mediator";
import { ExperienceStore } from "../../../infrastructure/stores/ExperienceStore";
import { GridStore } from "../../../infrastructure/stores/GridStore";

export class PathfindingAnimationCommandHandler
  implements CommandHandler<PathfindingAnimationCommand>
{
  private animationController: AnimationController;

  constructor(
    private readonly mediator: Mediator,
    private readonly experienceStore: ExperienceStore,
    private readonly gridStore: GridStore
  ) {
    this.animationController = AnimationController.create();
    this.experienceStore.subscribe(() => {
      if (!this.experienceStore.isAlgorithmRunning()) {
        this.animationController.abortAnimation();
      }
    });
  }

  execute(command: PathfindingAnimationCommand): void {
    this.animationController.startAnimation();

    const shortestPath = this.getShortestPath(command.endNode);

    this.animateExploration(command.path)
      .then(() => this.animateShortestPath(shortestPath))
      .then(() => this.handleAnimationCompleted());
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
        this.animationController.createTimeout(() => {
          const node = visitedNodesInOrder[i];

          if (!node.isStart() && !node.isEnd())
            this.gridStore.setNodeAs(node.getVector(), NodeType.Explored);

          if (i === visitedNodesInOrder.length - 1) resolve();
        }, 20 * i * this.experienceStore.getSpeed().getValue());
      }
    });
  }

  private animateShortestPath(shortestPath: Node[]): Promise<void> {
    return new Promise((resolve) => {
      let lastNode = shortestPath[0];

      for (let i = 1; i < shortestPath.length; i++) {
        this.animationController.createTimeout(() => {
          const node = shortestPath[i];
          this.gridStore.setNodeAs(lastNode.getVector(), NodeType.Path);

          if (!node.isStart() && !node.isEnd()) {
            this.gridStore.setNodeAs(node.getVector(), NodeType.Highlighted);
          }

          lastNode = node;

          if (i === shortestPath.length - 1) resolve();
        }, 50 * i * this.experienceStore.getSpeed().getValue());
      }
    });
  }

  private handleAnimationCompleted() {
    this.animationController.stopAnimation();

    setTimeout(
      () =>
        this.mediator.sendEvent(
          PathfindingAnimationCompletedEvent.name,
          new PathfindingAnimationCompletedEvent()
        ),
      2000
    );
  }
}
