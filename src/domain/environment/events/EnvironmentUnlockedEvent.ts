import { EventBase } from "@/infrastructure/mediator";

export class EnvironmentUnlockedEvent extends EventBase {
  public static readonly type = "EnvironmentUnlockedEvent";

  constructor() {
    super(EnvironmentUnlockedEvent.type);
  }
}
