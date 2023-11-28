import { EventContract } from "./EventContract";

export interface EventHandlerContract<T extends EventContract = EventContract> {
  handle(event: T): void | Promise<void>;
}
