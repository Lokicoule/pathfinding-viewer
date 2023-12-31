import { useContext } from "react";
import { MediatorContext } from "../MediatorProvider";

export function useMediator() {
  const mediator = useContext(MediatorContext);

  if (!mediator) {
    throw new Error(
      "Mediator not found. Make sure to wrap your app with MediatorProvider."
    );
  }

  return mediator;
}
