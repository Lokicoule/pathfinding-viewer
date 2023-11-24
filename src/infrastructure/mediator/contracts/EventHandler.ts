import { Callback } from "..";
import { Event } from "./Event";

export interface EventHandler<T extends Event> {
  handle<TReturn>(event: T): TReturn;
}

export type EventHandlerType<T extends Event> =
  | EventHandler<T>
  | Callback<unknown>;
