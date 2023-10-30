import { NodeInteractionCommand } from "../../../../domain/commands/NodeInteractionCommand";
import { RemoveWallCommand } from "../../../../domain/commands/RemoveWallCommand";
import { Mediator } from "../../../mediator/Mediator";

export function handleWallNodeClick(
  mediator: Mediator,
  command: NodeInteractionCommand
) {
  mediator.sendCommand(
    RemoveWallCommand.name,
    new RemoveWallCommand(command.node.getVector())
  );
}
