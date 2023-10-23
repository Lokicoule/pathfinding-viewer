import { SetSelectedNodeTypeCommand } from "../../../../domain/commands/SetSelectedNodeTypeCommand";
import { SelectedNodeType } from "../../../../domain/enums/SelectedNodeType";
import { Mediator } from "../../../../infrastructure/mediator/Mediator";

export function handleEndNodeClick(mediator: Mediator) {
  const setSelectedNodeTypeCommand = new SetSelectedNodeTypeCommand(
    SelectedNodeType.End
  );

  mediator.sendCommand(
    SetSelectedNodeTypeCommand.name,
    setSelectedNodeTypeCommand
  );
}
