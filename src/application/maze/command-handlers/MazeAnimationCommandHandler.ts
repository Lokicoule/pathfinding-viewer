import { MazeAnimationCommand } from "@domain/commands/MazeAnimationCommand";
import { StopMazeCommand } from "@domain/commands/maze/StopMazeCommand";
import { Node } from "@domain/entities/Node";
import { MazeAnimationCompletedEvent } from "@domain/events/MazeAnimationCompletedEvent";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { AnimationManager } from "@infra/animation/AnimationManager";
import { Mediator } from "@infra/mediator/Mediator";
import { AnimationStore } from "@infra/stores/AnimationStore";
import { ExperienceStore } from "@infra/stores/ExperienceStore";
import { GridStore } from "@infra/stores/GridStore";
import { PlaybackStore } from "@infra/stores/PlaybackStore";

export class MazeAnimationCommandHandler
  implements CommandHandler<MazeAnimationCommand>
{
  private animationManager: AnimationManager;
  constructor(
    private readonly mediator: Mediator,
    private readonly experienceStore: ExperienceStore,
    private readonly gridStore: GridStore,
    private readonly playbackStore: PlaybackStore,
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
        if (!node.isStart() && !node.isEnd()) {
          this.gridStore.setNodeAs(node.getVector(), node.getType());
        }
      }
      this.handleAnimationCompleted();
    }
  }

  private animateWallsBuilding(wallsInOrder: Node[]): Promise<void> {
    return new Promise((resolve) => {
      for (let i = 0; i < wallsInOrder.length; i++) {
        this.animationManager.createTimeout(() => {
          const node = wallsInOrder[i];

          if (!node.isStart() && !node.isEnd()) {
            this.gridStore.setNodeAs(node.getVector(), node.getType());
          }

          if (i === wallsInOrder.length - 1) resolve();
        }, 10 * i * this.experienceStore.getSpeed().getValue());
      }
    });
  }

  private handleAnimationCompleted(): void {
    this.mediator.sendCommand(StopMazeCommand.name, new StopMazeCommand());

    setTimeout(() => {
      this.mediator.sendEvent(
        MazeAnimationCompletedEvent.name,
        new MazeAnimationCompletedEvent()
      );
    }, 400);
  }
}
