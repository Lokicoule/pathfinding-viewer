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
    const shortestPath = this.getPath(command.endNode);

    if (this.animationStore.isActivated()) {
      this.animateExploration(command.path)
        .then(() => this.animatePath(shortestPath))
        .finally(() => this.handleAnimationCompleted());
    } else {
      for (const node of command.path) {
        if (!node.isStart() && !node.isEnd())
          this.gridStore.setNodeAs(node.getVector(), NodeType.Explored);
      }
      for (const node of shortestPath) {
        if (!node.isStart() && !node.isEnd())
          this.gridStore.setNodeAs(node.getVector(), NodeType.Path);
      }

      this.handleAnimationCompleted();
    }
  }

  private getPath(endNode: Node): Node[] {
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
        this.explorationAnimationManager.createTimeout(() => {
          const node = visitedNodesInOrder[i];

          if (!node.isStart() && !node.isEnd())
            this.gridStore.setNodeAs(node.getVector(), NodeType.Explored);

          if (i === visitedNodesInOrder.length - 1) resolve();
        }, 20 * i * this.experienceStore.getSpeed().getValue());
      }
    });
  }

  private animatePath(shortestPath: Node[]): Promise<void> {
    return new Promise((resolve) => {
      let lastNode = shortestPath[0];

      for (let i = 1; i < shortestPath.length; i++) {
        this.pathAnimationManager.createTimeout(() => {
          const node = shortestPath[i];
          this.gridStore.setNodeAs(lastNode.getVector(), NodeType.Path);

          if (!node.isStart() && !node.isEnd()) {
            this.gridStore.setNodeAs(node.getVector(), NodeType.Highlighted);
          }

          lastNode = node;

          if (i === shortestPath.length - 1) resolve();
        }, 50 * i);
      }

      // Fix: If the animation is stopped during the exploration phase, the path animation will not be stopped
      if (this.playbackStore.isStopped())
        this.mediator.sendCommand(
          StopPathfindingCommand.name,
          new StopPathfindingCommand()
        );
    });
  }

  private handleAnimationCompleted() {
    setTimeout(() => {
      this.mediator.sendEvent(
        PathfindingAnimationCompletedEvent.name,
        new PathfindingAnimationCompletedEvent()
      );
    }, 2000);
  }
}
