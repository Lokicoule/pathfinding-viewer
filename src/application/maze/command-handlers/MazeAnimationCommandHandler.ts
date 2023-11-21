import { MazeAnimationCommand } from "@domain/commands/maze/MazeAnimationCommand";
import { Node } from "@domain/entities/Node";
import { MazeAnimationCompletedEvent } from "@domain/events/MazeAnimationCompletedEvent";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { AnimationManager } from "@infra/animation";
import { Mediator } from "@infra/mediator";
import { AnimationStore } from "@infra/stores/AnimationStore";
import { GridStore } from "@infra/stores/GridStore";
import { PlaybackStore } from "@infra/stores/PlaybackStore";

export class MazeAnimationCommandHandler
  implements CommandHandler<MazeAnimationCommand>
{
  private animationManager: AnimationManager;
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore,
    playbackStore: PlaybackStore,
    private readonly animationStore: AnimationStore
  ) {
    this.animationManager = AnimationManager.create(playbackStore);
  }

  execute(command: MazeAnimationCommand): void {
    if (this.animationStore.isActivated()) {
      this.animateWallsBuilding(command.wallsInOrder).finally(() =>
        this.handleAnimationCompleted()
      );
    } else {
      for (const node of command.wallsInOrder) {
        if (node.isNotType("Start", "End")) {
          this.gridStore.setNodeAs(node.getVector(), node.getType());
        }
      }
      this.handleAnimationCompleted();
    }
  }

  private animateWallsBuilding(wallsInOrder: Node[]): Promise<void[]> {
    const promises: Promise<void>[] = wallsInOrder.map((node, i) => {
      return new Promise<void>((resolve) => {
        this.animationManager.createTimeout(() => {
          if (node.isNotType("Start", "End")) {
            this.gridStore.setNodeAs(node.getVector(), node.getType());
          }

          resolve();
        }, 10 * i * this.animationStore.getSpeed().getValue());
      });
    });

    return Promise.all(promises);
  }

  private handleAnimationCompleted(): void {
    setTimeout(() => {
      this.mediator.sendEvent(new MazeAnimationCompletedEvent());
    }, 400);
  }
}
