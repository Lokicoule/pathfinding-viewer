import { Grid } from "../domain/entities/Grid";

type GlobalState = {
  grid: Grid;
};

type State = GlobalState[keyof GlobalState];

export type Callback = (data: State) => void;

export type KeyInCache = "grid";

export class GlobalCache {
  private subscribers: Map<KeyInCache, Map<string, Callback>>;
  private data: Record<KeyInCache, GlobalState[KeyInCache]>;

  private constructor() {
    this.subscribers = new Map();

    this.data = {
      grid: {},
    } as Record<KeyInCache, GlobalState[KeyInCache]>;
  }

  public static create(): GlobalCache {
    return new GlobalCache();
  }

  public subscribe(key: KeyInCache, subscriberName: string, cb: Callback) {
    let keySubscribers = this.subscribers.get(key);

    if (!keySubscribers) {
      keySubscribers = new Map();
    }

    if (keySubscribers.has(subscriberName)) {
      console.log(`${subscriberName} already subscribed to ${key}, skipping.`);
    }

    keySubscribers.set(subscriberName, cb);
    this.subscribers.set(key, keySubscribers);
  }

  public get(key: KeyInCache) {
    return this.data[key];
  }

  public set(key: KeyInCache, data: GlobalState[KeyInCache]) {
    this.data[key] = data;
    this.notify(key);
  }

  public notify(key: KeyInCache) {
    const newState = this.get(key);

    const keySubscribers = this.subscribers.get(key);
    if (!keySubscribers) {
      return;
    }

    keySubscribers.forEach((cb) => {
      cb(newState);
    });
  }

  public unsubscribe(key: KeyInCache, subscriberName: string) {
    const keySubscribers = this.subscribers.get(key);

    if (keySubscribers) {
      keySubscribers.delete(subscriberName);
    }
  }
}
