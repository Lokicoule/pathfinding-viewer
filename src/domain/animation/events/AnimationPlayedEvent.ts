import { EventBase } from "@/infrastructure/mediator";

export class AnimationPlayedEvent extends EventBase {
  public static readonly type = "AnimationPlayedEvent";

  constructor() {
    super(AnimationPlayedEvent.type);
  }
}
