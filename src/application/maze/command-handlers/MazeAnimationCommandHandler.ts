import { Node } from "@domain/environment";
import {
  MazeAnimationCommand,
  MazeAnimationCompletedEvent,
} from "@domain/maze";
import { AnimationManager } from "@infra/animation";
import { CommandHandler, Mediator } from "@infra/mediator";
import { AnimationStore, GridStore, PlaybackStore } from "@infra/stores";

export class MazeAnimationCommandHandler implements CommandHandler {
  private animationManager: AnimationManager;
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore,
    playbackStore: PlaybackStore,
    private readonly animationStore: AnimationStore
  ) {
    this.animationManager = AnimationManager.create(playbackStore);
  }

  execute({ payload }: MazeAnimationCommand): void {
    if (this.animationStore.isActivated()) {
      this.animateWallsBuilding(payload.nodes).finally(() =>
        this.handleAnimationCompleted()
      );
    } else {
      for (const node of payload.nodes) {
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
