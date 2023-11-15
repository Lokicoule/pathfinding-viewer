import { PathfindingAnimationCommand } from "../../../domain/commands/PathfindingAnimationCommand";
import { Node } from "../../../domain/entities/Node";
import { NodeType } from "../../../domain/enums/NodeType";
import { PathfindingAnimationCompletedEvent } from "../../../domain/events/PathfindingAnimationCompletedEvent";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { AnimationManager } from "../../../infrastructure/animation/AnimationManager";
import { Mediator } from "../../../infrastructure/mediator/Mediator";
import { ExperienceStore } from "../../../infrastructure/stores/ExperienceStore";
import { GridStore } from "../../../infrastructure/stores/GridStore";
import { PlaybackStore } from "../../../infrastructure/stores/PlaybackStore";

export class PathfindingAnimationCommandHandler
  implements CommandHandler<PathfindingAnimationCommand>
{
  private explorationAnimationManager: AnimationManager;
  private pathAnimationManager: AnimationManager;

  constructor(
    private readonly mediator: Mediator,
    private readonly experienceStore: ExperienceStore,
    private readonly gridStore: GridStore,
    private readonly playbackStore: PlaybackStore
  ) {
    this.explorationAnimationManager = AnimationManager.create(playbackStore);
    this.pathAnimationManager = AnimationManager.create(playbackStore);
  }

  execute(command: PathfindingAnimationCommand): void {
    const shortestPath = this.getPath(command.endNode);

    this.animateExploration(command.path)
      .then(() => this.animatePath(shortestPath))
      .finally(() => this.handleAnimationCompleted());
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
        this.playbackStore.setPlayback("STOP");
    });
  }

  private handleAnimationCompleted() {
    setTimeout(() => {
      if (!this.playbackStore.isStopped()) {
        this.playbackStore.setPlayback("STOP");
      }

      this.mediator.sendEvent(
        PathfindingAnimationCompletedEvent.name,
        new PathfindingAnimationCompletedEvent()
      );
    }, 2000);
  }
}
