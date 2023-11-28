import { Mediator } from ".";

type EventHandler = () => void;

export class Saga {
  private events: string[] = [];

  constructor(
    private readonly mediator: Mediator,
    private readonly handler: EventHandler
  ) {}

  public registerEvent(eventName: string): void {
    this.events.push(eventName);
    this.mediator.registerEventHandler(eventName, this.run.bind(this));
  }

  private run(): void {
    this.handler();
  }
}
