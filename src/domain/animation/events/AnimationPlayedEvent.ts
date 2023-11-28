import { BaseEvent } from "@infra/cqrs/event/models";

export class AnimationPlayedEvent extends BaseEvent {
  public static readonly eventName = "event:animation-played";
}
