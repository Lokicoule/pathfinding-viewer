import { Observer } from "./Observer";

export type StoreState = {
  [key: string]: unknown;
};

export abstract class Store<T extends StoreState> {
  protected state: T;
  private observer: Observer;

  constructor(initialState: T) {
    this.state = initialState;
    this.observer = new Observer();
  }

  public getState(): T {
    return this.state;
  }

  public setState(newState: Partial<T>): void {
    this.state = { ...this.state, ...newState };
    this.observer.notify();
  }

  public subscribe(onStoreChange: () => void): () => void {
    return this.observer.subscribe(onStoreChange);
  }
}
