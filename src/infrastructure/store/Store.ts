export abstract class Store<T extends Record<string, unknown>> {
  protected state: T;

  constructor(initialState: T) {
    this.state = initialState;
  }

  public getState(): T {
    return this.state;
  }

  public setState(newState: Partial<T>): void {
    this.state = { ...this.state, ...newState };
  }
}

export default Store;
