import { EventContract } from "@/infrastructure/cqrs/event/contracts";
import { EventHandlerType } from "@/infrastructure/cqrs/event/types/EventHandlerType";
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
