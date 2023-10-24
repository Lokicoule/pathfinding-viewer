import { useMediator } from "./useMediator";
import { EventHandlerFn } from "../../../../domain/interfaces/EventHandler";

export const useEventListener = () => {
  const mediator = useMediator();

  const onEvent = (eventName: string, handler: EventHandlerFn) =>
    mediator.registerEventHandler(eventName, handler);

  return {
    on: onEvent,
  };
};
