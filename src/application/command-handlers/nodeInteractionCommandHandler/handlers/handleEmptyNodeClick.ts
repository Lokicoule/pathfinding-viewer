import { AddWallCommand } from "../../../../domain/commands/AddWallCommand";
import { NodeInteractionCommand } from "../../../../domain/commands/NodeInteractionCommand";
import { Mediator } from "../../../mediator/Mediator";

export function handleEmptyNodeClick(
  mediator: Mediator,
  command: NodeInteractionCommand
) {
  mediator.sendCommand(
    AddWallCommand.name,
    new AddWallCommand(command.node.getVector())
  );
}
