export interface QueueItem<T> {
  item: T;
  priority: number;
}

export class PriorityQueue<T> {
  private items: QueueItem<T>[];

  constructor() {
    this.items = new Array<QueueItem<T>>();
  }

  public enqueue(item: T, priority: number): void {
    this.items.push({ item, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  public dequeue(): T | undefined {
    return this.items.shift()?.item;
  }

  public peek(): T | undefined {
    return this.items[0]?.item;
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  public count(): number {
    return this.items.length;
  }
}
