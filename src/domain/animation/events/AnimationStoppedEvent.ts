import { EventBase } from "@/infrastructure/mediator";

export class AnimationStoppedEvent extends EventBase {
  public static readonly type = "AnimationStoppedEvent";

  constructor() {
    super(AnimationStoppedEvent.type);
  }
}
