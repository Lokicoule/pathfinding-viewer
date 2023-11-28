import { AnimationPlayedEvent } from "@/domain/animation/events";
import { LockEnvironmentCommand } from "@/domain/environment";
import { Saga } from "@/infrastructure/cqrs/saga/models/BaseSaga";
import { Mediator } from "@infra/mediator";

export class LockEnvironmentSaga extends Saga {
  private constructor(mediator: Mediator) {
    super(mediator, () => mediator.sendCommand(new LockEnvironmentCommand()));

    this.registerEvent(AnimationPlayedEvent);
  }

  public static register(mediator: Mediator): LockEnvironmentSaga {
    return new LockEnvironmentSaga(mediator);
  }
}
