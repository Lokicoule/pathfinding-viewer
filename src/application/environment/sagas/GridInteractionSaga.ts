import { ClearPathAndExploredNodesCommand } from "@/domain/environment/commands/ClearPathAndExploredNodesCommand";
import { ClearWallsCommand } from "@/domain/environment/commands/ClearWallsCommand";
import { ResetGridCommand } from "@/domain/environment/commands/ResetGridCommand";
import { Mediator } from "@infra/mediator";
import { GlobalState } from "../../../bootstrapping/GlobalState";
import {
  ClearPathAndExploredNodesCommandHandler,
  ClearWallsCommandHandler,
  ResetGridCommandHandler,
} from "../command-handlers/";

export class GridInteractionSaga {
  private constructor(
    private readonly mediator: Mediator,
    private readonly stores: GlobalState
  ) {
    const commandHandlers = [
      { command: ResetGridCommand.type, handler: ResetGridCommandHandler },
      { command: ClearWallsCommand.type, handler: ClearWallsCommandHandler },
      {
        command: ClearPathAndExploredNodesCommand.type,
        handler: ClearPathAndExploredNodesCommandHandler,
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
  ): GridInteractionSaga {
    return new GridInteractionSaga(mediator, stores);
  }
}
