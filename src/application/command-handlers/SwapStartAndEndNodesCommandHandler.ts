import { SwapStartAndEndNodesCommand } from "../../domain/commands/SwapStartAndEndNodesCommand";
import { StartAndEndNodesSwappedEvent } from "../../domain/events/StartAndEndNodesSwappedEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Mediator } from "../mediator/Mediator";
import { GridStore } from "../stores/GridStore";

export class SwapStartAndEndNodesCommandHandler
  implements CommandHandler<SwapStartAndEndNodesCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(): void {
    const result = this.gridStore.swapStartAndEndNodes();

    if (!result.success) {
      console.error("SwapStartAndEndNodesCommandHandler", result.error);
      return;
    }

    this.mediator.sendEvent(
      StartAndEndNodesSwappedEvent.name,
      new StartAndEndNodesSwappedEvent()
    );
  }
}
