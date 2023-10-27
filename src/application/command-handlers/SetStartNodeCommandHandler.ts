import { SetStartNodeCommand } from "../../domain/commands/SetStartNodeCommand";
import { NodeType } from "../../domain/enums/NodeType";
import { StartNodeSetEvent } from "../../domain/events/StartNodeSetEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { GridStore } from "../stores/GridStore";
import { Mediator } from "../mediator/Mediator";

export class SetStartNodeCommandHandler
  implements CommandHandler<SetStartNodeCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(command: SetStartNodeCommand): void {
    console.log("SetStartNodeCommandHandler", command);

    const { vector } = command;

    const node = this.gridStore.getNode(vector);

    if (
      !node ||
      node.getType() === NodeType.Start ||
      node.getType() === NodeType.End
    ) {
      return;
    }

    const previousStartNode = this.gridStore.getStartNode();

    const setPreviousStartNodeResult = this.gridStore.setNodeType(
      previousStartNode.getVector(),
      NodeType.Empty
    );
    if (!setPreviousStartNodeResult.success) {
      console.error(
        "SetStartNodeCommandHandler",
        "setPreviousStartNode",
        setPreviousStartNodeResult.error
      );
      return;
    }

    const setStartNodeResult = this.gridStore.setStartNode(vector);
    if (!setStartNodeResult.success) {
      console.error(
        "SetStartNodeCommandHandler",
        "setStartNode",
        setStartNodeResult.error
      );
      const restorePreviousStartNodeResult = this.gridStore.setNodeType(
        previousStartNode.getVector(),
        NodeType.Start
      );

      if (!restorePreviousStartNodeResult.success) {
        console.error(
          "SetStartNodeCommandHandler",
          "restorePreviousStartNode",
          restorePreviousStartNodeResult.error
        );
      }
      return;
    }

    this.mediator.sendEvent(StartNodeSetEvent.name, new StartNodeSetEvent());
  }
}
