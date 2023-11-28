import { BaseEvent } from "@infra/cqrs/event/models";

export class EnvironmentUnlockedEvent extends BaseEvent {
  public static readonly eventName = "event:environment-unlocked";
}
