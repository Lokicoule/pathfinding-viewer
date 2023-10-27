export type Listener = () => void;

export class Observer {
  private listeners: Listener[] = [];

  subscribe(listener: Listener) {
    this.listeners.push(listener);

    return () => {
      this.unsubscribe(listener);
    };
  }

  unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }
}
