import { RemoveWallCommand } from "../../domain/commands/RemoveWallCommand";
import { NodeType } from "../../domain/enums/NodeType";
import { WallRemovedEvent } from "../../domain/events/WallRemovedEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { GridStore } from "../stores/GridStore";
import { Mediator } from "../mediator/Mediator";

export class RemoveWallCommandHandler
  implements CommandHandler<RemoveWallCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(command: RemoveWallCommand): void {
    console.log("RemoveWallCommandHandler", command);

    const { vector } = command;
    const node = this.gridStore.getNode(vector);

    if (!node || node.getType() !== NodeType.Wall) {
      return;
    }

    const result = this.gridStore.setNodeAs(vector, NodeType.Empty);

    if (!result.success) {
      console.error("RemoveWallCommandHandler", result.error);
      return;
    }

    this.mediator.sendEvent(WallRemovedEvent.name, new WallRemovedEvent());
  }
}
