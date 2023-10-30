import { NodeInteractionCommand } from "../../../../domain/commands/NodeInteractionCommand";
import { SetEndNodeCommand } from "../../../../domain/commands/SetEndNodeCommand";
import { Mediator } from "../../../mediator/Mediator";

export function handleEndNodeChange(
  mediator: Mediator,
  command: NodeInteractionCommand
) {
  mediator.sendCommand(
    SetEndNodeCommand.name,
    new SetEndNodeCommand(command.node.getVector())
  );
}
