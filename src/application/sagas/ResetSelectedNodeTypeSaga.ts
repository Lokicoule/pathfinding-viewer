import { SetSelectedNodeTypeCommand } from "../../domain/commands/SetSelectedNodeTypeCommand";
import { SelectedNodeType } from "../../domain/enums/SelectedNodeType";
import { EndNodeSetEvent } from "../../domain/events/EndNodeSetEvent";
import { StartAndEndNodesSwappedEvent } from "../../domain/events/StartAndEndNodesSwappedEvent";
import { StartNodeSetEvent } from "../../domain/events/StartNodeSetEvent";
import { WallAddedEvent } from "../../domain/events/WallAddedEvent";
import { WallRemovedEvent } from "../../domain/events/WallRemovedEvent";
import { Mediator } from "../mediator/Mediator";

export class RestoreToDefaultNodeTypeOnEventSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [
      WallAddedEvent.name,
      WallRemovedEvent.name,
      StartNodeSetEvent.name,
      EndNodeSetEvent.name,
      StartAndEndNodesSwappedEvent.name,
    ];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.run);
    });
  }

  public static register(
    mediator: Mediator
  ): RestoreToDefaultNodeTypeOnEventSaga {
    return new RestoreToDefaultNodeTypeOnEventSaga(mediator);
  }

  private run = () => {
    this.mediator.sendCommand(
      SetSelectedNodeTypeCommand.name,
      new SetSelectedNodeTypeCommand(SelectedNodeType.Wall)
    );
  };
}
