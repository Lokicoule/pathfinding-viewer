import { AddWallsCommand } from "@/domain/commands/grid/AddWallsCommand";
import { RemoveWallsCommand } from "@/domain/commands/grid/RemoveWallsCommand";
import { SetEndNodeCommand } from "@/domain/commands/grid/SetEndNodeCommand";
import { SetStartNodeCommand } from "@/domain/commands/grid/SetStartNodeCommand";
import { SwapStartAndEndNodesCommand } from "@/domain/commands/grid/SwapStartAndEndNodesCommand";
import { Mediator } from "@infra/mediator";
import { GlobalState } from "../../../bootstrapping/GlobalState";
import {
  AddWallsCommandHandler,
  RemoveWallsCommandHandler,
  SetEndNodeCommandHandler,
  SetStartNodeCommandHandler,
  SwapStartAndEndNodesCommandHandler,
} from "../command-handlers/";

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
