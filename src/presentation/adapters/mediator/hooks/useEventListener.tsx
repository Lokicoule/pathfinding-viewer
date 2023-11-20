import { Callback } from "@domain/types/Callback";
import { useMediator } from "./useMediator";

export const useEventListener = () => {
  const mediator = useMediator();

  return (eventName: string, handler: Callback) =>
    mediator.registerEventHandler(eventName, handler);
};
