import { BaseEvent } from "@infra/cqrs/event/models";

export class AlgorithmUpdatedEvent extends BaseEvent {
  public static readonly eventName = "event:algorithm-updated";
}
