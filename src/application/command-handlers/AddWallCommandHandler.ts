import { AddWallCommand } from "../../domain/commands/AddWallCommand";
import { NodeType } from "../../domain/enums/NodeType";
import { WallAddedEvent } from "../../domain/events/WallAddedEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { GridStore } from "../stores/GridStore";
import { Mediator } from "../mediator/Mediator";

export class AddWallCommandHandler implements CommandHandler<AddWallCommand> {
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(command: AddWallCommand): void {
    console.log("AddWallCommandHandler", command);

    const { vector } = command;
    const node = this.gridStore.getNode(vector);

    if (
      !node ||
      node.getType() === NodeType.Start ||
      node.getType() === NodeType.End
    ) {
      return;
    }

    const result = this.gridStore.setNodeAs(vector, NodeType.Wall);

    if (!result.success) {
      console.error("AddWallCommandHandler", result.error);
      return;
    }

    this.mediator.sendEvent(WallAddedEvent.name, new WallAddedEvent());
  }
}
