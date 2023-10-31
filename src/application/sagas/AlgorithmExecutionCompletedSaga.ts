import { AnimateShortestPathCommand } from "../../domain/commands/AnimateShortestPathCommand";
import { BreadthFirstSearchCompletedEvent } from "../../domain/events/BreadthFirstSearchCompletedEvent";
import { Mediator } from "../mediator/Mediator";

export class AlgorithmExecutionCompletedSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [BreadthFirstSearchCompletedEvent.name];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.run);
    });
  }

  public static register(mediator: Mediator): AlgorithmExecutionCompletedSaga {
    return new AlgorithmExecutionCompletedSaga(mediator);
  }

  private run = (event: BreadthFirstSearchCompletedEvent) => {
    this.mediator.sendCommand(
      AnimateShortestPathCommand.name,
      new AnimateShortestPathCommand(event.endNode)
    );
  };
}
