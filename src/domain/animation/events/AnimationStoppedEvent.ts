import { BaseEvent } from "@/infrastructure/cqrs/event/models";

export class AnimationStoppedEvent extends BaseEvent {
  public static readonly eventName = "event:animation-stopped";
}
