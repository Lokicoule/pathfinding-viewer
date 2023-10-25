import { Mediator } from "../../application/mediator/Mediator";
import { StateChangedEvent } from "../../domain/events/StateChangedEvent";

export abstract class Store<T extends Record<string, unknown>> {
  protected state: T;

  constructor(
    private readonly mediator: Mediator,
    private readonly stateChangedEventName: string,
    initialState: T
  ) {
    this.state = initialState;
  }

  public getState(): T {
    return this.state;
  }

  public setState(newState: Partial<T>): void {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  public subscribe(handler: () => void): () => void {
    return this.mediator.registerEventHandler(
      this.stateChangedEventName,
      handler
    );
  }

  protected render(): void {
    this.mediator.sendEvent(
      this.stateChangedEventName,
      new StateChangedEvent(this.state)
    );
  }
}

export default Store;
