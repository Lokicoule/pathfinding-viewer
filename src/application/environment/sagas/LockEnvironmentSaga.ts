import { AnimationPlayedEvent } from "@/domain/animation/events";
import { LockEnvironmentCommand } from "@/domain/environment";
import { Mediator } from "@infra/mediator";

export class LockEnvironmentSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [AnimationPlayedEvent.type];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.run);
    });
  }

  public static register(mediator: Mediator): LockEnvironmentSaga {
    return new LockEnvironmentSaga(mediator);
  }

  private run = () => {
    this.mediator.sendCommand(new LockEnvironmentCommand());
  };
}
