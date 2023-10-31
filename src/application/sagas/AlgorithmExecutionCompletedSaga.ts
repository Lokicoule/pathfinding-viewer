import { AnimateShortestPathCommand } from "../../domain/commands/AnimateShortestPathCommand";
import { BreadthFirstSearchCompletedEvent } from "../../domain/events/BreadthFirstSearchCompletedEvent";
import { DepthFirstSearchCompletedEvent } from "../../domain/events/DepthFirstSearchCompletedEvent";
import { Mediator } from "../mediator/Mediator";

export class AlgorithmExecutionCompletedSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [
      BreadthFirstSearchCompletedEvent.name,
      DepthFirstSearchCompletedEvent.name,
    ];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.run);
    });
  }

  public static register(mediator: Mediator): AlgorithmExecutionCompletedSaga {
    return new AlgorithmExecutionCompletedSaga(mediator);
  }

  private run = (
    event: BreadthFirstSearchCompletedEvent | DepthFirstSearchCompletedEvent
  ) => {
    this.mediator.sendCommand(
      AnimateShortestPathCommand.name,
      new AnimateShortestPathCommand(event.endNode)
    );
  };
}
