import { MazeAlgorithmAnimationCommand } from "../../domain/commands/MazeAlgorithmAnimationCommand";
import { Node } from "../../domain/entities/Node";
import { NodeType } from "../../domain/enums/NodeType";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Mediator } from "../mediator/Mediator";
import { GridStore } from "../stores/GridStore";

export class MazeAlgorithmAnimationCommandHandler
  implements CommandHandler<MazeAlgorithmAnimationCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(command: MazeAlgorithmAnimationCommand): void {
    this.animateWallsBuilding(command.wallsInOrder);
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
