export interface Event {
  type: string;
}

export interface EventWithPayload<T> extends Event {
  payload: T;
}

export abstract class EventBase implements Event {
  constructor(public readonly type: string) {}
}

export abstract class EventBaseWithPayload<T> implements Event {
  constructor(public readonly type: string, public readonly payload: T) {}
}
