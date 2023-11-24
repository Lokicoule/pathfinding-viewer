import { Store } from "../store/Store";

export type EnvironmentStoreState = {
  isLocked: boolean;
};

export class EnvironmentStore extends Store<EnvironmentStoreState> {
  constructor() {
    super({
      isLocked: false,
    });
  }

  public lock() {
    this.state.isLocked = true;
  }

  public unlock() {
    this.state.isLocked = false;
  }

  public isLocked(): boolean {
    return this.state.isLocked;
  }
}
