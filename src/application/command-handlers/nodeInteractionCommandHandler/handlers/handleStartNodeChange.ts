import { NodeInteractionCommand } from "../../../../domain/commands/NodeInteractionCommand";
import { SetStartNodeCommand } from "../../../../domain/commands/SetStartNodeCommand";
import { Mediator } from "../../../mediator/Mediator";

export function handleStartNodeChange(
  mediator: Mediator,
  command: NodeInteractionCommand
) {
  const setStartNodeCommand = new SetStartNodeCommand(command.node.getVector());

  mediator.sendCommand(SetStartNodeCommand.name, setStartNodeCommand);
}
