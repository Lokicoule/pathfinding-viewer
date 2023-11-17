import { MazeAnimationCommand } from "../../../domain/commands/MazeAnimationCommand";
import { StopMazeCommand } from "../../../domain/commands/maze/StopMazeCommand";
import { Node } from "../../../domain/entities/Node";
import { NodeType } from "../../../domain/enums/NodeType";
import { MazeAnimationCompletedEvent } from "../../../domain/events/MazeAnimationCompletedEvent";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { AnimationManager } from "../../../infrastructure/animation/AnimationManager";
import { Mediator } from "../../../infrastructure/mediator/Mediator";
import { AnimationStore } from "../../../infrastructure/stores/AnimationStore";
import { ExperienceStore } from "../../../infrastructure/stores/ExperienceStore";
import { GridStore } from "../../../infrastructure/stores/GridStore";
import { PlaybackStore } from "../../../infrastructure/stores/PlaybackStore";

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
        if (
          node.getType() !== NodeType.Start &&
          node.getType() !== NodeType.End
        ) {
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

          if (
            node.getType() !== NodeType.Start &&
            node.getType() !== NodeType.End
          ) {
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
