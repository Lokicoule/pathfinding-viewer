import { EventContract } from "../contracts";

export abstract class BaseEvent implements EventContract {
  public static readonly eventName: string;

  public get eventName(): string {
    return (this.constructor as typeof BaseEvent).eventName;
  }
}
