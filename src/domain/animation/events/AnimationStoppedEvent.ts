import { BaseEvent } from "@infra/cqrs";

export class AnimationStoppedEvent extends BaseEvent {
  public static readonly eventName = "event:animation-stopped";
}
