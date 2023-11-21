import { MazeAnimationCommand } from "@domain/commands/maze/MazeAnimationCommand";
import { MazeRunnerCompletedEvent } from "@domain/events/MazeRunnerCompletedEvent";
import { Mediator } from "@infra/mediator";

export class MazeCompletionSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [MazeRunnerCompletedEvent.name];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.run);
    });
  }

  public static register(mediator: Mediator): MazeCompletionSaga {
    return new MazeCompletionSaga(mediator);
  }

  private run = (event: MazeRunnerCompletedEvent) => {
    this.mediator.sendCommand(new MazeAnimationCommand(event.path));
  };
}
