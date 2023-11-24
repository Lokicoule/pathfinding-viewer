import { useEffect } from "react";
import { useMediator } from "./useMediator";
import { Callback } from "@/infrastructure/mediator";

export const useEventListener = (
  eventName: string,
  handler: Callback<unknown>
) => {
  const mediator = useMediator();

  useEffect(() => {
    const unsubscribe = mediator.registerEventHandler(eventName, handler);

    return () => {
      unsubscribe();
    };
  }, [eventName, handler, mediator]);
};
