import { SetStartNodeCommand } from "../../domain/commands/SetStartNodeCommand";
import { NodeType } from "../../domain/entities/Node";
import { GridUpdatedEvent } from "../../domain/events/GridUpdatedEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Mediator } from "../../infrastructure/mediator/Mediator";
import { GridStore } from "../../infrastructure/stores/GridStore";

export class SetStartNodeCommandHandler
  implements CommandHandler<SetStartNodeCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  handle(command: SetStartNodeCommand): void {
    console.log("SetStartNodeCommandHandler", command);

    const { x, y } = command;

    this.gridStore.setNodeType(x, y, NodeType.Start);

    this.mediator.sendEvent(GridUpdatedEvent.name, new GridUpdatedEvent());
  }
}
