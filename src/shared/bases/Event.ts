export abstract class BaseEvent<EventType> {
  constructor(
    public readonly type: string,
    public readonly payload?: EventType
  ) {}
}
