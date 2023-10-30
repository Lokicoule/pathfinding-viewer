import { SetStartNodeCommand } from "../../domain/commands/SetStartNodeCommand";
import { NodeType } from "../../domain/enums/NodeType";
import { StartNodeSetEvent } from "../../domain/events/StartNodeSetEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Mediator } from "../mediator/Mediator";
import { GridStore } from "../stores/GridStore";

export class SetStartNodeCommandHandler
  implements CommandHandler<SetStartNodeCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(command: SetStartNodeCommand): void {
    const node = this.gridStore.getNode(command.vector);

    if (!node || [NodeType.Start, NodeType.End].includes(node.getType()))
      return;

    const setStartNodeResult = this.gridStore.setStartNode(command.vector);

    if (!setStartNodeResult.success) {
      console.error(
        `SetStartNodeCommandHandler - setStartNode: ${setStartNodeResult.error}`
      );
      return;
    }

    this.mediator.sendEvent(StartNodeSetEvent.name, new StartNodeSetEvent());
  }
}
