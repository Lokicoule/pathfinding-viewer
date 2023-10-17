import { Callback, GlobalCache, KeyInCache } from "../application/GlobalCache";

export class SubscriptionManager {
  private cache: GlobalCache;
  private key: KeyInCache;
  private subscriberName: string;
  private callback: Callback;

  constructor(
    cache: GlobalCache,
    key: KeyInCache,
    subscriberName: string,
    callback: Callback
  ) {
    this.cache = cache;
    this.key = key;
    this.subscriberName = subscriberName;
    this.callback = callback;
    this.setupSubscription();
  }

  private setupSubscription() {
    this.cache.subscribe(this.key, this.subscriberName, this.callback);
  }

  public getValue() {
    return this.cache.get(this.key);
  }

  public unsubscribe(): void {
    this.cache.unsubscribe(this.key, this.subscriberName);
  }
}
