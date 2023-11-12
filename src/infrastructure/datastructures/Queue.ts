export class Queue<T> {
  private items: T[];

  constructor() {
    this.items = new Array<T>();
  }

  public enqueue(item: T): void {
    this.items.push(item);
  }

  public dequeue(): T | undefined {
    return this.items.shift();
  }

  public peek(): T | undefined {
    return this.items[0];
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  public count(): number {
    return this.items.length;
  }

  public toArray(): T[] {
    return this.items;
  }
}
