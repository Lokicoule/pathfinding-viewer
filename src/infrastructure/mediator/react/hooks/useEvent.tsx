import { useMediator } from ".";
import { EventHandler } from "../../../../domain/interfaces/EventHandler";

export const useEvent = () => {
  const mediator = useMediator();

  const onEvent = (eventName: string, handler: EventHandler) => {
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
