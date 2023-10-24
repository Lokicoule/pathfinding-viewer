import { AddWallCommand } from "../../domain/commands/AddWallCommand";
import { NodeType } from "../../domain/enums/NodeType";
import { WallAddedEvent } from "../../domain/events/WallAddedEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Mediator } from "../../infrastructure/mediator/Mediator";
import { GridStore } from "../../infrastructure/stores/GridStore";

export class AddWallCommandHandler implements CommandHandler<AddWallCommand> {
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(command: AddWallCommand): void {
    console.log("AddWallCommandHandler", command);

    const { x, y } = command;
    const node = this.gridStore.getNode(x, y);

    if (
      !node ||
      node.getType() === NodeType.Start ||
      node.getType() === NodeType.End
    ) {
      return;
    }

    const result = this.gridStore.setNodeType(x, y, NodeType.Wall);

    if (!result.success) {
      console.error("AddWallCommandHandler", result.error);
      return;
    }

    this.mediator.sendEvent(WallAddedEvent.name, new WallAddedEvent());
  }
}