import { PubSub } from "../pubsub/PubSub";
import { Callback } from "../types/Callback";
import { Event } from "../contracts/Event";
import { EventHandler, EventHandlerType } from "../contracts/EventHandler";

export class EventBus extends PubSub<string, EventHandlerType<Event>> {
  public subscribeEvent(eventName: string, handler: EventHandlerType<Event>) {
    return this.subscribe(eventName, handler);
  }

  public publishEvent(eventName: string, event: Event) {
    console.log("publishEvent", eventName, event);
    this.publish(eventName, event);
  }

  public unsubscribeEvent(eventName: string, handler: EventHandler<Event>) {
    this.unsubscribe(eventName, handler);
  }

  public applyMiddlewares(...middlewares: any[]) {
    for (const middleware of middlewares) {
      this.handlers.forEach((handlers, channel) => {
        this.handlers.set(
          channel,
          handlers.map((handler) => middleware(handler))
        );
      });
    }
  }

  private async publish<TReturn>(
    channel: string,
    event: Event
  ): Promise<void | TReturn> {
    const handlers = this.handlers.get(channel);

    if (handlers) {
      for (const handler of handlers) {
        if (typeof handler === "function") {
          (handler as Callback<TReturn>)(event);
        } else {
          (handler as EventHandler<Event>).handle(event);
        }
      }
    }
  }
}
