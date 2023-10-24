import { SetEndNodeCommand } from "../../../../domain/commands/SetEndNodeCommand";
import { SetSelectedNodeTypeCommand } from "../../../../domain/commands/SetSelectedNodeTypeCommand";
import { SelectedNodeType } from "../../../../domain/enums/SelectedNodeType";
import { NodeInteractionCommand } from "../../../../domain/commands/NodeInteractionCommand";
import { Mediator } from "../../../mediator/Mediator";

export function handleEndNodeChange(
  mediator: Mediator,
  command: NodeInteractionCommand
) {
  const setEndNodeCommand = new SetEndNodeCommand(
    command.node.getX(),
    command.node.getY()
  );
  const setSelectedNodeTypeCommand = new SetSelectedNodeTypeCommand(
    SelectedNodeType.Wall
  );

  mediator.sendCommand(SetEndNodeCommand.name, setEndNodeCommand);
  mediator.sendCommand(
    SetSelectedNodeTypeCommand.name,
    setSelectedNodeTypeCommand
  );
}
