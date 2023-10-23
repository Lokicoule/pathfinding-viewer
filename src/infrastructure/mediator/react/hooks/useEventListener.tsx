import { useMediator } from ".";
import { EventHandlerFn } from "../../../../domain/interfaces/EventHandler";

export const useEventListener = () => {
  const mediator = useMediator();

  const onEvent = (eventName: string, handler: EventHandlerFn) => {
    mediator.registerEventHandler(eventName, handler);
  };

  const offEvent = (eventName: string) => {
    mediator.unregisterEventHandler(eventName);
  };

  return {
    on: onEvent,
    off: offEvent,
  };
};
