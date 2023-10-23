import { SetSelectedNodeTypeCommand } from "../../../../domain/commands/SetSelectedNodeTypeCommand";
import { SelectedNodeType } from "../../../../domain/enums/SelectedNodeType";
import { Mediator } from "../../../../infrastructure/mediator/Mediator";

export function handleStartNodeClick(mediator: Mediator) {
  const setSelectedNodeTypeCommand = new SetSelectedNodeTypeCommand(
    SelectedNodeType.Start
  );

  mediator.sendCommand(
    SetSelectedNodeTypeCommand.name,
    setSelectedNodeTypeCommand
  );
}
