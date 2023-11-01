import { AlgorithmAnimationCommand } from "../../domain/commands/AlgorithmAnimationCommand";
import { MazeAlgorithmAnimationCommand } from "../../domain/commands/MazeAlgorithmAnimationCommand";
import { AlgorithmRunnerCompletedEvent } from "../../domain/events/AlgorithmRunnerCompletedEvent";
import { MazeAlgorithmRunnerCompletedEvent } from "../../domain/events/MazeAlgorithmRunnerCompletedEvent";
import { Mediator } from "../mediator/Mediator";

export class AlgorithmCompletionSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOnSolver = [AlgorithmRunnerCompletedEvent.name];
    const runsOnGenerator = [MazeAlgorithmRunnerCompletedEvent.name];

    runsOnSolver.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.runSolverAnimation);
    });

    runsOnGenerator.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.runGeneratorAnimation);
    });
  }

  public static register(mediator: Mediator): AlgorithmCompletionSaga {
    return new AlgorithmCompletionSaga(mediator);
  }

  private runSolverAnimation = (event: AlgorithmRunnerCompletedEvent) => {
    this.mediator.sendCommand(
      AlgorithmAnimationCommand.name,
      new AlgorithmAnimationCommand(event.endNode, event.visitedNodesInOrder)
    );
  };

  private runGeneratorAnimation = (
    event: MazeAlgorithmRunnerCompletedEvent
  ) => {
    this.mediator.sendCommand(
      MazeAlgorithmAnimationCommand.name,
      new MazeAlgorithmAnimationCommand(event.wallsInOrder)
    );
  };
}
