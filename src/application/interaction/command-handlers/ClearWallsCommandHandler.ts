import { ClearWallsCommand } from "../../../domain/commands/ClearWallsCommand";
import { NodeType } from "../../../domain/enums/NodeType";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { ExperienceStore } from "../../../infrastructure/stores/ExperienceStore";
import { GridStore } from "../../../infrastructure/stores/GridStore";

export class ClearWallsCommandHandler
  implements CommandHandler<ClearWallsCommand>
{
  constructor(
    private readonly experienceStore: ExperienceStore,
    private readonly gridStore: GridStore
  ) {}

  execute(): void {
    this.gridStore
      .getGrid()
      .getNodes()
      .forEach((row) => {
        row.forEach((node) => {
          if (node.isWall()) {
            this.gridStore.setNodeAs(
              node.getVector(),
              node.getPreviousType() === NodeType.Wall
                ? NodeType.Empty
                : node.getPreviousType()
            );
          }
        });
      });

    this.experienceStore.reset();
  }
}
