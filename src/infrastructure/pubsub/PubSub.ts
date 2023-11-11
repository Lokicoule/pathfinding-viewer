import { Command } from "../../domain/interfaces/Command";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Event } from "../../domain/interfaces/Event";
import { EventHandler } from "../../domain/interfaces/EventHandler";
import { Callback } from "../../domain/types/Callback";

export abstract class PubSub<
  Channel,
  Handler extends CommandHandler<Command> | EventHandler<Event> | Callback
> {
  protected readonly handlers: Map<Channel, Array<Handler>> = new Map();

  protected subscribe(channel: Channel, handler: Handler) {
    const handlers = this.handlers.get(channel);

    if (handlers) {
      handlers.push(handler);
    } else {
      this.handlers.set(channel, [handler]);
    }

    return () => this.unsubscribe(channel, handler);
  }

  protected publish<T>(channel: Channel, message: T) {
    const handlers = this.handlers.get(channel);

    if (handlers) {
      handlers.forEach((handler) => {
        if (message instanceof Command) {
          if (typeof handler === "function") {
            (handler as Callback)(message);
          } else {
            (handler as CommandHandler<Command>).execute(message);
          }
        } else if (message instanceof Event) {
          if (typeof handler === "function") {
            (handler as Callback)(message);
          } else {
            (handler as EventHandler<Event>).handle(message);
          }
        } else {
          throw new Error("Invalid message type");
        }
      });
    } else {
      throw new Error(`No handler registered for channel: ${channel}`);
    }
  }

  protected unsubscribe(channel: Channel, handler: Handler) {
    const handlers = this.handlers.get(channel);

    if (handlers) {
      const index = handlers.indexOf(handler);
      handlers.splice(index, 1);
    }
  }
}
