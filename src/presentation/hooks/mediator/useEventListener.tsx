import { Callback } from "../../../domain/types/Callback";
import { useMediator } from "./useMediator";

export const useEventListener = () => {
  const mediator = useMediator();

  const onEvent = (eventName: string, handler: Callback) =>
    mediator.registerEventHandler(eventName, handler);

  return {
    on: onEvent,
  };
};
