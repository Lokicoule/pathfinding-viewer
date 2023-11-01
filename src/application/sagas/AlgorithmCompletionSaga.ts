import { AlgorithmAnimationCommand } from "../../domain/commands/AlgorithmAnimationCommand";
import { AlgorithmRunnerCompletedEvent } from "../../domain/events/AlgorithmRunnerCompletedEvent";
import { Mediator } from "../mediator/Mediator";

export class AlgorithmCompletionSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [AlgorithmRunnerCompletedEvent.name];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.run);
    });
  }

  public static register(mediator: Mediator): AlgorithmCompletionSaga {
    return new AlgorithmCompletionSaga(mediator);
  }

  private run = (event: AlgorithmRunnerCompletedEvent) => {
    this.mediator.sendCommand(
      AlgorithmAnimationCommand.name,
      new AlgorithmAnimationCommand(event.endNode, event.visitedNodesInOrder)
    );
  };
}
