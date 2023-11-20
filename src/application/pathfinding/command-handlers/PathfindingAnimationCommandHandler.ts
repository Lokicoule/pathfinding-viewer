import { PathfindingAnimationCommand } from "@domain/commands/PathfindingAnimationCommand";
import { StopPathfindingCommand } from "@domain/commands/pathfinding/StopPathfindingCommand";
import { Node } from "@domain/entities/Node";
import { NodeType } from "@domain/enums/NodeType";
import { PathfindingAnimationCompletedEvent } from "@domain/events/PathfindingAnimationCompletedEvent";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { AnimationManager } from "@infra/animation";
import { Mediator } from "@infra/mediator";
import { AnimationStore } from "@infra/stores/AnimationStore";
import { ExperienceStore } from "@infra/stores/ExperienceStore";
import { GridStore } from "@infra/stores/GridStore";
import { PlaybackStore } from "@infra/stores/PlaybackStore";

export class PathfindingAnimationCommandHandler
  implements CommandHandler<PathfindingAnimationCommand>
{
  private explorationAnimationManager: AnimationManager;
  private pathAnimationManager: AnimationManager;

  constructor(
    private readonly mediator: Mediator,
    private readonly experienceStore: ExperienceStore,
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
        if (!node.isStart() && !node.isEnd())
          this.gridStore.setNodeAs(node.getVector(), NodeType.Explored);
      }
      for (const node of path) {
        if (!node.isStart() && !node.isEnd())
          this.gridStore.setNodeAs(node.getVector(), NodeType.Path);
      }

      this.handleAnimationCompleted();
    }
  }

  private getPath(endNode: Node): Node[] {
    const path: Node[] = [];
    let currentNode: Node | undefined = endNode;

    while (currentNode && !currentNode.isStart()) {
      path.unshift(currentNode);

      currentNode = currentNode.getPreviousNode();
    }

    return path;
  }

  private async animateExploration(visitedNodesInOrder: Node[]): Promise<void> {
    const promises: Promise<void>[] = visitedNodesInOrder.map((node, i) => {
      return new Promise<void>((resolve) => {
        this.explorationAnimationManager.createTimeout(() => {
          if (!node.isStart() && !node.isEnd()) {
            this.gridStore.setNodeAs(node.getVector(), NodeType.Explored);
          }

          resolve();
        }, 20 * i * this.experienceStore.getSpeed().getValue());
      });
    });

    return Promise.all(promises).then(() => {});
  }

  private async animatePath(path: Node[]): Promise<void> {
    let lastNode = path.shift();

    const promises = path.map((node, i) => {
      return new Promise<void>((resolve) => {
        this.pathAnimationManager.createTimeout(() => {
          if (lastNode) {
            this.gridStore.setNodeAs(lastNode.getVector(), NodeType.Path);
          }

          if (!node.isStart() && !node.isEnd()) {
            this.gridStore.setNodeAs(node.getVector(), NodeType.Highlighted);
          }

          lastNode = node;

          resolve();
        }, 50 * (i + 1));
      });
    });

    return Promise.all(promises).then(() => {
      if (this.playbackStore.isStopped()) {
        this.mediator.sendCommand(new StopPathfindingCommand());
      }
    });
  }

  private handleAnimationCompleted() {
    console.log("Animation completed");
    setTimeout(() => {
      this.mediator.sendEvent(new PathfindingAnimationCompletedEvent());
    }, 1900);
  }
}
