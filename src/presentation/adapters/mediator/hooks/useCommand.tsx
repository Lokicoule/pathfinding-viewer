import { Command } from "@domain/interfaces/Command";
import { useMediator } from "./useMediator";

export function useCommand<TCommand extends Command>() {
  const mediator = useMediator();

  return (command: TCommand) => {
    mediator.sendCommand(command);
  };
}
