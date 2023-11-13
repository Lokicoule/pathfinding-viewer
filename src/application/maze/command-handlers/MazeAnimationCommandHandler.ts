import { MazeAnimationCommand } from "../../../domain/commands/MazeAnimationCommand";
import { Node } from "../../../domain/entities/Node";
import { NodeType } from "../../../domain/enums/NodeType";
import { MazeAnimationCompletedEvent } from "../../../domain/events/MazeAnimationCompletedEvent";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { AnimationController } from "../../../infrastructure/controllers/AnimationController";
import { Mediator } from "../../../infrastructure/mediator/Mediator";
import { ExperienceStore } from "../../../infrastructure/stores/ExperienceStore";
import { GridStore } from "../../../infrastructure/stores/GridStore";

export class MazeAnimationCommandHandler
  implements CommandHandler<MazeAnimationCommand>
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

  execute(command: MazeAnimationCommand): void {
    this.animationController.startAnimation();

    this.animateWallsBuilding(command.wallsInOrder).then(() =>
      this.handleAnimationCompleted()
    );
  }

  private animateWallsBuilding(wallsInOrder: Node[]): Promise<void> {
    return new Promise((resolve) => {
      for (let i = 0; i < wallsInOrder.length; i++) {
        this.animationController.createTimeout(() => {
          const node = wallsInOrder[i];

          if (
            node.getType() !== NodeType.Start &&
            node.getType() !== NodeType.End
          ) {
            this.gridStore.setNodeAs(node.getVector(), node.getType());
          }

          if (i === wallsInOrder.length - 1) resolve();
        }, 10 * i);
      }
    });
  }

  private handleAnimationCompleted(): void {
    this.animationController.stopAnimation();

    setTimeout(() => {
      this.mediator.sendEvent(
        MazeAnimationCompletedEvent.name,
        new MazeAnimationCompletedEvent()
      );
    }, 800);
  }
}
