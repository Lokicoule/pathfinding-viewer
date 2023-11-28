import { Mediator } from "../../../mediator";
import { EventContract } from "../../event/contracts";

type EventHandler = () => void;

export abstract class Saga {
  constructor(
    private readonly mediator: Mediator,
    private readonly handler: EventHandler
  ) {}

  protected registerEvent(event: EventContract): void {
    this.mediator.registerEventHandler(event, this.run.bind(this));
  }

  private run(): void {
    this.handler();
  }
}
