import { MazeAnimationCommand } from "../../../domain/commands/MazeAnimationCommand";
import { Node } from "../../../domain/entities/Node";
import { NodeType } from "../../../domain/enums/NodeType";
import { MazeAnimationCompletedEvent } from "../../../domain/events/MazeAnimationCompletedEvent";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { Mediator } from "../../../infrastructure/mediator/Mediator";
import { GridStore } from "../../../infrastructure/stores/GridStore";

export class MazeAnimationCommandHandler
  implements CommandHandler<MazeAnimationCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(command: MazeAnimationCommand): void {
    this.animateWallsBuilding(command.wallsInOrder).then(() => {
      this.mediator.sendEvent(
        MazeAnimationCompletedEvent.name,
        new MazeAnimationCompletedEvent()
      );
    });
  }

  private animateWallsBuilding(wallsInOrder: Node[]): Promise<void> {
    return new Promise((resolve) => {
      for (let i = 0; i < wallsInOrder.length; i++) {
        setTimeout(() => {
          const node = wallsInOrder[i];
          if (
            node.getType() !== NodeType.Start &&
            node.getType() !== NodeType.End
          )
            this.gridStore.setNodeAs(node.getVector(), node.getType());
          if (i === wallsInOrder.length - 1) resolve();
        }, 10 * i);
      }
    });
  }
}
