import { CommandContract } from "@infra/cqrs/command/contracts";
import { useMediator } from "./useMediator";

export function useCommand() {
  const mediator = useMediator();

  return (command: CommandContract) => {
    mediator.sendCommand(command);
  };
}
