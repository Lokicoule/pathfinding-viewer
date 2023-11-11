import { MazeRunnerCommand } from "../../../domain/commands/MazeRunnerCommand";
import { PathfindingRunnerCommand } from "../../../domain/commands/PathfindingRunnerCommand";
import { StartAlgorithmCommand } from "../../../domain/commands/StartAlgorithmCommand";
import { Mediator } from "../../../infrastructure/mediator/Mediator";

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
    this.mediator.sendCommand(
      StartAlgorithmCommand.name,
      new StartAlgorithmCommand()
    );
  };
}
