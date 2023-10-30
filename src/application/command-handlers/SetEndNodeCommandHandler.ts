import { SetEndNodeCommand } from "../../domain/commands/SetEndNodeCommand";
import { NodeType } from "../../domain/enums/NodeType";
import { EndNodeSetEvent } from "../../domain/events/EndNodeSetEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Mediator } from "../mediator/Mediator";
import { GridStore } from "../stores/GridStore";

export class SetEndNodeCommandHandler
  implements CommandHandler<SetEndNodeCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(command: SetEndNodeCommand): void {
    const node = this.gridStore.getNode(command.vector);

    if (!node || [NodeType.Start, NodeType.End].includes(node.getType()))
      return;

    const setEndNodeResult = this.gridStore.setEndNode(command.vector);

    if (!setEndNodeResult.success) {
      console.error(
        `SetEndNodeCommandHandler - setEndNode: ${setEndNodeResult.error}`
      );
      return;
    }

    this.mediator.sendEvent(EndNodeSetEvent.name, new EndNodeSetEvent());
  }
}
