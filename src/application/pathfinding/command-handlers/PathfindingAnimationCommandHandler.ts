import { PathfindingAnimationCommand } from "@domain/commands/pathfinding/PathfindingAnimationCommand";
import { StopPathfindingCommand } from "@domain/commands/pathfinding/StopPathfindingCommand";
import { Node } from "@domain/entities/Node";
import { PathfindingAnimationCompletedEvent } from "@domain/events/PathfindingAnimationCompletedEvent";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { AnimationManager } from "@infra/animation";
import { Mediator } from "@infra/mediator";
import { AnimationStore } from "@infra/stores/AnimationStore";
import { GridStore } from "@infra/stores/GridStore";
import { PlaybackStore } from "@infra/stores/PlaybackStore";

export class PathfindingAnimationCommandHandler
  implements CommandHandler<PathfindingAnimationCommand>
{
  private explorationAnimationManager: AnimationManager;
  private pathAnimationManager: AnimationManager;

  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore,
    private readonly playbackStore: PlaybackStore,
    private readonly animationStore: AnimationStore
  ) {
    this.explorationAnimationManager = AnimationManager.create(playbackStore);
    this.pathAnimationManager = AnimationManager.create(playbackStore);
  }

  execute(command: PathfindingAnimationCommand): void {
    const path = this.getPath(command.endNode);

    if (this.animationStore.isActivated()) {
      this.animateExploration(command.path)
        .then(() => this.animatePath(path))
        .finally(() => this.handleAnimationCompleted());
    } else {
      for (const node of command.path) {
        if (node.isNotType("Start", "End")) {
          this.gridStore.setNodeAs(node.getVector(), "Explored");
        }
      }
      for (const node of path) {
        if (node.isNotType("Start", "End")) {
          this.gridStore.setNodeAs(node.getVector(), "Path");
        }
      }

      this.handleAnimationCompleted();
    }
  }

  private getPath(endNode: Node): Node[] {
    const path: Node[] = [];
    let currentNode: Node | undefined = endNode;

    while (currentNode && !currentNode.isType("Start")) {
      path.unshift(currentNode);

      currentNode = currentNode.getPreviousNode();
    }

    return path;
  }

  private async animateExploration(
    visitedNodesInOrder: Node[]
  ): Promise<void[]> {
    const promises: Promise<void>[] = visitedNodesInOrder.map((node, i) => {
      return new Promise<void>((resolve) => {
        this.explorationAnimationManager.createTimeout(() => {
          if (node.isNotType("Start", "End")) {
            this.gridStore.setNodeAs(node.getVector(), "Explored");
          }

          resolve();
        }, 20 * i * this.animationStore.getSpeed().getValue());
      });
    });

    return Promise.all(promises);
  }

  private async animatePath(path: Node[]): Promise<void[]> {
    let lastNode = path.shift();

    const promises = path.map((node, i) => {
      return new Promise<void>((resolve) => {
        this.pathAnimationManager.createTimeout(() => {
          if (lastNode) {
            this.gridStore.setNodeAs(lastNode.getVector(), "Path");
          }

          if (node.isNotType("Start", "End")) {
            this.gridStore.setNodeAs(node.getVector(), "Highlighted");
          }

          lastNode = node;

          resolve();
        }, 50 * (i + 1));
      });
    });

    if (this.playbackStore.isStopped()) {
      this.mediator.sendCommand(new StopPathfindingCommand());
    }

    return Promise.all(promises);
  }

  private handleAnimationCompleted() {
    setTimeout(() => {
      this.mediator.sendEvent(new PathfindingAnimationCompletedEvent());
    }, 1900);
  }
}
