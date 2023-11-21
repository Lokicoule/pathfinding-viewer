import { AddWallsCommand } from "@/domain/commands/grid/AddWallsCommand";
import { RemoveWallsCommand } from "@/domain/commands/grid/RemoveWallsCommand";
import { SwapStartAndEndNodesCommand } from "@/domain/commands/grid/SwapStartAndEndNodesCommand";
import { Mediator } from "@infra/mediator";
import { GlobalState } from "../../../bootstrapping/GlobalState";
import { AddWallsCommandHandler } from "../command-handlers/AddWallsCommandHandler";
import { RemoveWallsCommandHandler } from "../command-handlers/RemoveWallsCommandHandler";
import { SwapStartAndEndNodesCommandHandler } from "../command-handlers/SwapStartAndEndNodesCommandHandler";
import { SetStartNodeCommand } from "@/domain/commands/grid/SetStartNodeCommand";
import { SetStartNodeCommandHandler } from "../command-handlers/SetStartNodeCommandHandler";
import { SetEndNodeCommand } from "@/domain/commands/grid/SetEndNodeCommand";
import { SetEndNodeCommandHandler } from "../command-handlers/SetEndNodeCommandHandler";

export class NodeInteractionSaga {
  private constructor(
    private readonly mediator: Mediator,
    private readonly stores: GlobalState
  ) {
    const commandHandlers = [
      {
        command: AddWallsCommand.name,
        handler: AddWallsCommandHandler,
      },
      { command: RemoveWallsCommand.name, handler: RemoveWallsCommandHandler },
      {
        command: SwapStartAndEndNodesCommand.name,
        handler: SwapStartAndEndNodesCommandHandler,
      },
      {
        command: SetStartNodeCommand.name,
        handler: SetStartNodeCommandHandler,
      },
      {
        command: SetEndNodeCommand.name,
        handler: SetEndNodeCommandHandler,
      },
    ];

    commandHandlers.forEach(({ command, handler }) => {
      this.mediator.registerCommandHandler(
        command,
        new handler(this.stores.gridStore)
      );
    });
  }

  public static register(
    mediator: Mediator,
    stores: GlobalState
  ): NodeInteractionSaga {
    return new NodeInteractionSaga(mediator, stores);
  }
}
