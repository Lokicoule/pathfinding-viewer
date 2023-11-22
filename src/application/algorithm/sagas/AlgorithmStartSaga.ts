import { StartAlgorithmCommand } from "@domain/algorithm";
import { MazeRunnerCommand } from "@domain/maze";
import { PathfindingRunnerCommand } from "@domain/pathfinding";
import { Mediator } from "@infra/mediator";

export class AlgorithmStartSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [MazeRunnerCommand.type, PathfindingRunnerCommand.type];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerCommandHandler(eventName, this.run);
    });
  }

  public static register(mediator: Mediator): AlgorithmStartSaga {
    return new AlgorithmStartSaga(mediator);
  }

  private run = () => {
    this.mediator.sendCommand(new StartAlgorithmCommand());
  };
}
