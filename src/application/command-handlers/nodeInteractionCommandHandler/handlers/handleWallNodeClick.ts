import { RemoveWallCommand } from "../../../../domain/commands/RemoveWallCommand";
import { SetSelectedNodeTypeCommand } from "../../../../domain/commands/SetSelectedNodeTypeCommand";
import { SelectedNodeType } from "../../../../domain/enums/SelectedNodeType";
import { NodeInteractionCommand } from "../../../../domain/commands/NodeInteractionCommand";
import { Mediator } from "../../../mediator/Mediator";

export function handleWallNodeClick(
  mediator: Mediator,
  command: NodeInteractionCommand
) {
  console.log("handleWallNodeClick", command);

  const setSelectedNodeTypeCommand = new SetSelectedNodeTypeCommand(
    SelectedNodeType.Wall
  );
  const removeWallCommand = new RemoveWallCommand(command.node.getVector());

  mediator.sendCommand(
    SetSelectedNodeTypeCommand.name,
    setSelectedNodeTypeCommand
  );
  mediator.sendCommand(RemoveWallCommand.name, removeWallCommand);
}
