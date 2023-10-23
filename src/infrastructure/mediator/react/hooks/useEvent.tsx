import { Event } from "../../../../domain/interfaces/Event";
import { useMediator } from "./useMediator";

export function useEvent<TEvent extends Event>(EventName: string) {
  const mediator = useMediator();

  return (Event: TEvent) => {
    mediator.sendEvent(EventName, Event);
  };
}
