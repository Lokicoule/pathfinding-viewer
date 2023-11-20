import { Event } from "@domain/interfaces/Event";
import { useMediator } from "./useMediator";

export function useEvent<TEvent extends Event>() {
  const mediator = useMediator();

  return (event: TEvent) => {
    mediator.sendEvent(event);
  };
}
