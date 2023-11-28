import { EventContract } from "@infra/cqrs";
import { useMediator } from "./useMediator";

export function useEvent() {
  const mediator = useMediator();

  return (event: EventContract) => {
    mediator.sendEvent(event);
  };
}
