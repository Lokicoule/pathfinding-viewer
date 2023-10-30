import { NodeInteractionCommand } from "../../../../domain/commands/NodeInteractionCommand";
import { RemoveWallCommand } from "../../../../domain/commands/RemoveWallCommand";
import { Mediator } from "../../../mediator/Mediator";

export function handleWallNodeClick(
  mediator: Mediator,
  command: NodeInteractionCommand
) {
  console.log("handleWallNodeClick", command);

  const removeWallCommand = new RemoveWallCommand(command.node.getVector());

  mediator.sendCommand(RemoveWallCommand.name, removeWallCommand);
}
