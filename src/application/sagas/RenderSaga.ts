import { EndNodeSetEvent } from "../../domain/events/EndNodeSetEvent";
import { GridResetEvent } from "../../domain/events/GridResetedEvent";
import { StartNodeSetEvent } from "../../domain/events/StartNodeSetEvent";
import { WallAddedEvent } from "../../domain/events/WallAddedEvent";
import { WallRemovedEvent } from "../../domain/events/WallRemovedEvent";
import { Mediator } from "../mediator/Mediator";

export class RenderSaga {
  constructor(private readonly mediator: Mediator) {
    const runsOn = [
      WallAddedEvent.name,
      WallRemovedEvent.name,
      StartNodeSetEvent.name,
      EndNodeSetEvent.name,
      GridResetEvent.name,
    ];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.run);
    });
  }

  private run = () => {};
}
