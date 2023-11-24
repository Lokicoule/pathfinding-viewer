import { Node } from "@domain/environment";
import {
  PathfindingAnimationCommand,
  PathfindingAnimationCompletedEvent,
  StopPathfindingCommand,
} from "@domain/pathfinding";
import { AnimationManager } from "@infra/animation";
import { CommandHandler, Mediator } from "@infra/mediator";
import { AnimationStore, GridStore, PlaybackStore } from "@infra/stores";

export class PathfindingAnimationCommandHandler implements CommandHandler {
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

  execute({ payload }: PathfindingAnimationCommand): void {
    const path = this.getPath(payload.endNode);

    if (this.animationStore.isActivated()) {
      this.animateExploration(payload.path)
        .then(() => this.animatePath(path))
        .finally(() => this.handleAnimationCompleted());
    } else {
      for (const node of payload.path) {
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
