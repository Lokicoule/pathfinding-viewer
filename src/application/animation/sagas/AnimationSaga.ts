import { MazeAnimationCompletedEvent } from "@/domain/maze";
import { PathfindingAnimationCompletedEvent } from "@/domain/pathfinding";
import { StopAnimationCommand } from "@domain/animation";
import { Saga } from "@infra/cqrs";
import { Mediator } from "@infra/mediator";

export class AnimationSaga extends Saga {
  private constructor(mediator: Mediator) {
    super(mediator, () => mediator.sendCommand(new StopAnimationCommand()));

    this.registerEvent(MazeAnimationCompletedEvent);
    this.registerEvent(PathfindingAnimationCompletedEvent);
  }

  public static register(mediator: Mediator): AnimationSaga {
    return new AnimationSaga(mediator);
  }
}
