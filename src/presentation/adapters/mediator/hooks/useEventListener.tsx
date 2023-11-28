import { EventContract, EventHandlerType } from "@infra/cqrs";
import { useEffect } from "react";
import { useMediator } from "./useMediator";

export const useEventListener = (
  event: EventContract,
  handler: EventHandlerType
) => {
  const mediator = useMediator();

  useEffect(() => {
    const unsubscribe = mediator.registerEventHandler(event, handler);

    return () => {
      unsubscribe();
    };
  }, [event, handler, mediator]);
};
