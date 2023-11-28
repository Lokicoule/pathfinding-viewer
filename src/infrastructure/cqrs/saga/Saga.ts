import { Mediator } from "../../mediator";
import { EventContract } from "../event/contracts";

type EventHandler = <EventType extends EventContract>(
  event?: EventType
) => void;

export abstract class Saga {
  constructor(
    private readonly mediator: Mediator,
    private readonly handler: EventHandler
  ) {}

  protected registerEvent(event: EventContract): void {
    this.mediator.registerEventHandler(event, this.run.bind(this));
  }

  private run(event?: EventContract): void {
    this.handler(event);
  }
}
