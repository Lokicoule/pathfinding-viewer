import { GlobalState } from "../../../bootstrapping/GlobalState";
import { ClearPathAndExploredNodesCommand } from "../../../domain/commands/ClearPathAndExploredNodesCommand";
import { ClearWallsCommand } from "../../../domain/commands/ClearWallsCommand";
import { NodeInteractionCommand } from "../../../domain/commands/NodeInteractionCommand";
import { ResetGridCommand } from "../../../domain/commands/ResetGridCommand";
import { Mediator } from "../../../infrastructure/mediator/Mediator";
import { ClearPathAndExploredNodesCommandHandler } from "../command-handlers/ClearPathAndExploredNodesCommandHandler";
import { ClearWallsCommandHandler } from "../command-handlers/ClearWallsCommandHandler";
import { NodeInteractionCommandHandler } from "../command-handlers/NodeInteractionCommandHandler";
import { ResetGridCommandHandler } from "../command-handlers/ResetGridCommandHandler";

export class GridInteractionSaga {
  private constructor(
    private readonly mediator: Mediator,
    private readonly stores: GlobalState
  ) {
    const commandHandlers = [
      {
        command: NodeInteractionCommand.name,
        handler: NodeInteractionCommandHandler,
      },
      { command: ResetGridCommand.name, handler: ResetGridCommandHandler },
      { command: ClearWallsCommand.name, handler: ClearWallsCommandHandler },
      {
        command: ClearPathAndExploredNodesCommand.name,
        handler: ClearPathAndExploredNodesCommandHandler,
      },
    ];

    commandHandlers.forEach(({ command, handler }) => {
      this.mediator.registerCommandHandler(
        command,
        new handler(this.stores.experienceStore, this.stores.gridStore)
      );
    });
  }

  public static register(
    mediator: Mediator,
    stores: GlobalState
  ): GridInteractionSaga {
    return new GridInteractionSaga(mediator, stores);
  }
}