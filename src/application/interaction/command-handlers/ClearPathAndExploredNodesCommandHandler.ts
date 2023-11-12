import { ClearPathAndExploredNodesCommand } from "../../../domain/commands/ClearPathAndExploredNodesCommand";
import { NodeType } from "../../../domain/enums/NodeType";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { ExperienceStore } from "../../../infrastructure/stores/ExperienceStore";
import { GridStore } from "../../../infrastructure/stores/GridStore";

export class ClearPathAndExploredNodesCommandHandler
  implements CommandHandler<ClearPathAndExploredNodesCommand>
{
  constructor(
    private readonly experienceStore: ExperienceStore,
    private readonly gridStore: GridStore
  ) {}

  execute(): void {
    this.gridStore.clear(
      NodeType.Path,
      NodeType.Explored,
      NodeType.Highlighted
    );

    this.experienceStore.reset();
  }
}
