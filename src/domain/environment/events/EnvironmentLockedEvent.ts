import { BaseEvent } from "@infra/cqrs/event/models";

export class EnvironmentLockedEvent extends BaseEvent {
  public static readonly eventName = "event:environment-locked";
}
