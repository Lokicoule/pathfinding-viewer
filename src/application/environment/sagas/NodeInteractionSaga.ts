import { AddWallsCommand } from "@domain/commands/environment/AddWallsCommand";
import { RemoveWallsCommand } from "@domain/commands/environment/RemoveWallsCommand";
import { SetEndNodeCommand } from "@domain/commands/environment/SetEndNodeCommand";
import { SetStartNodeCommand } from "@domain/commands/environment/SetStartNodeCommand";
import { SwapStartAndEndNodesCommand } from "@domain/commands/environment/SwapStartAndEndNodesCommand";
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
