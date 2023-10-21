import { AddWallCommand } from "../../domain/commands/AddWallCommand";
import { NodeType } from "../../domain/entities/Node";
import { GridUpdatedEvent } from "../../domain/events/GridUpdatedEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Mediator } from "../../infrastructure/mediator/Mediator";
import { GridStore } from "../../infrastructure/stores/GridStore";

export class AddWallCommandHandler implements CommandHandler<AddWallCommand> {
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  handle(command: AddWallCommand): void {
    console.log("AddWallCommandHandler", command);

    const { x, y } = command;
    const node = this.gridStore.getNode(x, y);

    if (
      node?.getType() === NodeType.Start ||
      node?.getType() === NodeType.End
    ) {
      return;
    }

    this.gridStore.setNodeType(x, y, NodeType.Wall);

    this.mediator.sendEvent(GridUpdatedEvent.name, new GridUpdatedEvent());
  }
}
