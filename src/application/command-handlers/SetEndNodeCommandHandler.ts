import { SetEndNodeCommand } from "../../domain/commands/SetEndNodeCommand";
import { NodeType } from "../../domain/enums/NodeType";
import { StartNodeSetEvent } from "../../domain/events/StartNodeSetEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { GridStore } from "../stores/GridStore";
import { Mediator } from "../mediator/Mediator";

export class SetEndNodeCommandHandler
  implements CommandHandler<SetEndNodeCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(command: SetEndNodeCommand): void {
    console.log("SetEndNodeCommandHandler", command);

    const { vector } = command;

    const node = this.gridStore.getNode(vector);

    if (
      !node ||
      node.getType() === NodeType.Start ||
      node.getType() === NodeType.End
    ) {
      return;
    }

    const setEndNodeResult = this.gridStore.setEndNode(vector);

    if (!setEndNodeResult.success) {
      console.error(
        "SetEndNodeCommandHandler",
        "setEndNode",
        setEndNodeResult.error
      );

      return;
    }

    this.mediator.sendEvent(StartNodeSetEvent.name, new StartNodeSetEvent());
  }
}
