import { AddWallCommand } from "../../domain/commands/AddWallCommand";
import { NodeType } from "../../domain/enums/NodeType";
import { WallAddedEvent } from "../../domain/events/WallAddedEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Mediator } from "../mediator/Mediator";
import { GridStore } from "../stores/GridStore";

export class AddWallCommandHandler implements CommandHandler<AddWallCommand> {
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(command: AddWallCommand): void {
    const node = this.gridStore.getNode(command.vector);

    if (!node || [NodeType.Start, NodeType.End].includes(node.getType()))
      return;

    const result = this.gridStore.setNodeAs(command.vector, NodeType.Wall);

    if (!result.success) {
      console.error(`AddWallCommandHandler - ${result.error}`);
      return;
    }

    this.mediator.sendEvent(WallAddedEvent.name, new WallAddedEvent());
  }
}
