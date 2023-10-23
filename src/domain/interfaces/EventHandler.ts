import { Event } from "./Event";

export interface EventHandler<T extends Event> {
  handle(event: T): void;
}

export type EventHandlerFn = (event: Event) => void;
