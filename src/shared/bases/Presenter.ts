import { GlobalCache } from "../../application/GlobalCache";

export abstract class Presenter<T> {
  protected vm?: T;
  protected cb: (vm?: T) => void;
  protected cache: GlobalCache;

  constructor(cache: GlobalCache) {
    this.cache = cache;
    this.cb = () => {};
  }

  protected abstract rebuildViewModel(...args: unknown[]): void;

  public load(cb: (vm?: T) => void): void {
    this.cb = cb;
    this.cb(this.vm);
  }

  public unload(): void {
    this.cb = () => {};
  }
}
