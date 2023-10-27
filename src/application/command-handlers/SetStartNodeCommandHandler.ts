import { SetStartNodeCommand } from "../../domain/commands/SetStartNodeCommand";
import { NodeType } from "../../domain/enums/NodeType";
import { StartNodeSetEvent } from "../../domain/events/StartNodeSetEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { GridStore } from "../../presentation/stores/gridStore/GridStore";
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

    const { x, y } = command;

    const node = this.gridStore.getNode(x, y);

    if (
      !node ||
      node.getType() === NodeType.Start ||
      node.getType() === NodeType.End
    ) {
      return;
    }

    const previousStartNode = this.gridStore.getStartNode();

    const setPreviousStartNodeResult = this.gridStore.setNodeType(
      previousStartNode.getX(),
      previousStartNode.getY(),
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

    const setStartNodeResult = this.gridStore.setStartNode(x, y);
    if (!setStartNodeResult.success) {
      console.error(
        "SetStartNodeCommandHandler",
        "setStartNode",
        setStartNodeResult.error
      );
      const restorePreviousStartNodeResult = this.gridStore.setNodeType(
        previousStartNode.getX(),
        previousStartNode.getY(),
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
