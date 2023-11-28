import { MazeAnimationCommand, MazeRunnerCompletedEvent } from "@domain/maze";
import { Mediator } from "@infra/mediator";

export class MazeCompletionSaga {
  private constructor(private readonly mediator: Mediator) {
    this.mediator.registerEventHandler(MazeRunnerCompletedEvent, this.run);
  }

  public static register(mediator: Mediator): MazeCompletionSaga {
    return new MazeCompletionSaga(mediator);
  }

  private run = (event: MazeRunnerCompletedEvent) => {
    this.mediator.sendCommand(new MazeAnimationCommand(event.path));
  };
}
