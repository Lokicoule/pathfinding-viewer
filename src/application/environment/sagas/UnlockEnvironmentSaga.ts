import { UnlockEnvironmentCommand } from "@domain/environment";
import { Saga } from "@infra/cqrs";
import { MazeAnimationCompletedEvent } from "@domain/maze";
import { PathfindingAnimationCompletedEvent } from "@domain/pathfinding";
import { Mediator } from "@infra/mediator";

export class UnlockEnvironmentSaga extends Saga {
  private constructor(mediator: Mediator) {
    super(mediator, () => mediator.sendCommand(new UnlockEnvironmentCommand()));

    this.registerEvent(MazeAnimationCompletedEvent);
    this.registerEvent(PathfindingAnimationCompletedEvent);
  }

  public static register(mediator: Mediator): UnlockEnvironmentSaga {
    return new UnlockEnvironmentSaga(mediator);
  }
}
