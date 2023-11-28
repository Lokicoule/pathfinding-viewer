import { ICommand } from "@/infrastructure/mediator";
import { useMediator } from "./useMediator";

export function useCommand() {
  const mediator = useMediator();

  return (command: ICommand) => {
    mediator.sendCommand(command);
  };
}
