import { AddWallCommand } from "../../../../domain/commands/AddWallCommand";
import { NodeInteractionCommand } from "../../../../domain/commands/NodeInteractionCommand";
import { Mediator } from "../../../mediator/Mediator";

export function handleEmptyNodeClick(
  mediator: Mediator,
  command: NodeInteractionCommand
) {
  const addWallCommand = new AddWallCommand(
    command.node.getX(),
    command.node.getY()
  );

  mediator.sendCommand(AddWallCommand.name, addWallCommand);
}
