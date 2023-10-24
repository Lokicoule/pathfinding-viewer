import { SetSelectedNodeTypeCommand } from "../../../../domain/commands/SetSelectedNodeTypeCommand";
import { SetStartNodeCommand } from "../../../../domain/commands/SetStartNodeCommand";
import { SelectedNodeType } from "../../../../domain/enums/SelectedNodeType";
import { NodeInteractionCommand } from "../../../../domain/commands/NodeInteractionCommand";
import { Mediator } from "../../../mediator/Mediator";

export function handleStartNodeChange(
  mediator: Mediator,
  command: NodeInteractionCommand
) {
  const setStartNodeCommand = new SetStartNodeCommand(
    command.node.getX(),
    command.node.getY()
  );
  const setSelectedNodeTypeCommand = new SetSelectedNodeTypeCommand(
    SelectedNodeType.Wall
  );

  mediator.sendCommand(SetStartNodeCommand.name, setStartNodeCommand);
  mediator.sendCommand(
    SetSelectedNodeTypeCommand.name,
    setSelectedNodeTypeCommand
  );
}
