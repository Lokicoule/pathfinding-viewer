import { Subscription } from "../types/Subscription";

export abstract class PubSub<Channel, Handler> {
  protected readonly handlers: Map<Channel, Array<Handler>> = new Map();

  protected subscribe(channel: Channel, handler: Handler): Subscription {
    const handlers = this.handlers.get(channel);

    if (handlers) {
      handlers.push(handler);
    } else {
      this.handlers.set(channel, [handler]);
    }

    return () => this.unsubscribe(channel, handler);
  }

  protected unsubscribe(channel: Channel, handler: Handler) {
    const handlers = this.handlers.get(channel);

    if (handlers) {
      const index = handlers.indexOf(handler);
      handlers.splice(index, 1);
    }
  }
}
