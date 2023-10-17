import { Events } from "../domain/events";
import { Handler } from "../shared/bases/Handler";
import { Commands } from "./commands";

export class EventBus {
  private handlers: Record<string, Handler<Events | Commands>[]> = {};

  private constructor() {}

  public static create(): EventBus {
    return new EventBus();
  }

  publish<T extends Events | Commands>(event: T): void {
    if (!this.handlers[event.type]) {
      return;
    }

    this.handlers[event.type].forEach((handler) => handler.handle(event));
  }

  subscribe<T extends Events | Commands>(
    type: string,
    handler: Handler<T>
  ): void {
    if (!this.handlers[type]) {
      this.handlers[type] = [];
    }

    this.handlers[type].push(handler);
  }
}
