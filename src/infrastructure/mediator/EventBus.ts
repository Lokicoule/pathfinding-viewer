import { Event } from "../../domain/interfaces/Event";
import { EventHandler } from "../../domain/interfaces/EventHandler";
import { Callback } from "../../domain/types/Callback";
import { PubSub } from "../pubsub/PubSub";

export class EventBus extends PubSub<string, EventHandler<Event> | Callback> {
  public subscribeEvent<TEvent extends Event>(
    eventName: string,
    handler: EventHandler<TEvent> | Callback
  ) {
    this.subscribe(eventName, handler);
  }

  public publishEvent<TEvent extends Event>(
    eventName: string,
    event: TEvent | Callback
  ) {
    this.publish(eventName, event);
  }

  public unsubscribeEvent<TEvent extends Event>(
    eventName: string,
    handler: EventHandler<TEvent> | Callback
  ) {
    this.unsubscribe(eventName, handler);
  }
}
