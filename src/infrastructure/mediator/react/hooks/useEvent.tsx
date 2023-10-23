import { Command } from "../../../../domain/interfaces/Command";
import { useMediator } from "./useMediator";

export function useEvent<TCommand extends Command>() {
  const mediator = useMediator();

  return (eventName: string, command: TCommand) => {
    mediator.sendEvent(eventName, command);
  };
}
