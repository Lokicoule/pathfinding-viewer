import { SetEndNodeCommand } from "../../domain/commands/SetEndNodeCommand";
import { NodeType } from "../../domain/enums/NodeType";
import { StartNodeSetEvent } from "../../domain/events/StartNodeSetEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { GridStore } from "../../presentation/stores/gridStore/GridStore";
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

    const { x, y } = command;

    const node = this.gridStore.getNode(x, y);

    if (
      !node ||
      node.getType() === NodeType.Start ||
      node.getType() === NodeType.End
    ) {
      return;
    }

    const previousEndNode = this.gridStore.getEndNode();

    const setPreviousEndNodeResult = this.gridStore.setNodeType(
      previousEndNode.getX(),
      previousEndNode.getY(),
      NodeType.Empty
    );

    if (!setPreviousEndNodeResult.success) {
      console.error(
        "SetEndNodeCommandHandler",
        "setPreviousEndNode",
        setPreviousEndNodeResult.error
      );
      return;
    }

    const setEndNodeResult = this.gridStore.setEndNode(x, y);

    if (!setEndNodeResult.success) {
      console.error(
        "SetEndNodeCommandHandler",
        "setEndNode",
        setEndNodeResult.error
      );

      const restorePreviousEndNodeResult = this.gridStore.setNodeType(
        previousEndNode.getX(),
        previousEndNode.getY(),
        NodeType.End
      );

      if (!restorePreviousEndNodeResult.success) {
        console.error(
          "SetEndNodeCommandHandler",
          "restorePreviousEndNode",
          restorePreviousEndNodeResult.error
        );
      }
      return;
    }

    this.mediator.sendEvent(StartNodeSetEvent.name, new StartNodeSetEvent());
  }
}
