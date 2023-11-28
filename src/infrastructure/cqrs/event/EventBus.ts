import { Unsubscribe } from "../shared/types/Unsubscribe";
import { EventContract } from "./contracts/EventContract";
import { EventNotFoundException } from "./exceptions/EventNotFoundException";
import { EventHandlerType } from "./types/EventHandlerType";

export class EventBus {
  private events: Map<string, Array<EventHandlerType>> = new Map();

  register(event: EventContract, handler: EventHandlerType): Unsubscribe {
    const identifier = event.eventName;

    const handlers = this.events.get(identifier);

    if (handlers) {
      handlers.push(handler);
    } else {
      this.events.set(identifier, [handler]);
    }

    return () => {
      this.unsubscribe(identifier, handler);
    };
  }

  handle(event: EventContract): void | Promise<void> {
    const identifier = event.eventName;
    const handler = this.events.get(identifier);

    if (!handler) {
      throw new EventNotFoundException(identifier);
    }

    handler.forEach((handler) => {
      if (typeof handler === "function") {
        handler(event);
      } else {
        handler.handle(event);
      }
    });
  }

  private unsubscribe(identifier: string, handler: EventHandlerType) {
    const handlers = this.events.get(identifier);

    if (handlers) {
      const index = handlers.indexOf(handler);

      if (index !== -1) {
        handlers.splice(index, 1);
      }

      if (handlers.length === 0) {
        this.events.delete(identifier);
      } else {
        this.events.set(identifier, handlers);
      }
    }
  }
}
