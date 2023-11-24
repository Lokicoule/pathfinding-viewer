import { EventBase } from "@/infrastructure/mediator";

export class EnvironmentLockedEvent extends EventBase {
  public static readonly type = "EnvironmentLockedEvent";

  constructor() {
    super(EnvironmentLockedEvent.type);
  }
}
