import { Command } from "@domain/interfaces/Command";
import { useMediator } from "./useMediator";

export function useCommand() {
  const mediator = useMediator();

  return (command: Command) => {
    mediator.sendCommand(command);
  };
}
