import { EventContract } from "@/infrastructure/cqrs/event/contracts";
import { useMediator } from "./useMediator";

export function useEvent() {
  const mediator = useMediator();

  return (event: EventContract) => {
    mediator.sendEvent(event);
  };
}
