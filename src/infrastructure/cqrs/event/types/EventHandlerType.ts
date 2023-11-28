import { EventContract, EventHandlerContract } from "../contracts";

export type EventHandlerType =
  | EventHandlerContract
  | ((event: EventContract) => void | Promise<void>);

export type EventHandlerTypeGeneric<T extends EventContract> =
  | EventHandlerContract<T>
  | ((event: T) => void | Promise<void>);
