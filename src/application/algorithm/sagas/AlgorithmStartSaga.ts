import { StartAlgorithmCommand } from "@domain/commands/algorithm/StartAlgorithmCommand";
import { MazeRunnerCommand } from "@domain/commands/maze/MazeRunnerCommand";
import { PathfindingRunnerCommand } from "@domain/commands/pathfinding/PathfindingRunnerCommand";
import { Mediator } from "@infra/mediator";

export class AlgorithmStartSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [MazeRunnerCommand.name, PathfindingRunnerCommand.name];

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
