import { Mediator } from "@/infrastructure/mediator";
import {
  AddWallsCommandHandler,
  ClearPathAndExploredNodesCommandHandler,
  ClearWallsCommandHandler,
  RemoveWallsCommandHandler,
  ResetGridCommandHandler,
  SetEndNodeCommandHandler,
  SetStartNodeCommandHandler,
  SwapStartAndEndNodesCommandHandler,
  LockEnvironmentCommandHandler,
  UnlockEnvironmentCommandHandler,
} from "./command-handlers";
import { IsEnvironmentLockedQueryHandler } from "./query-handlers";
import { LockEnvironmentSaga, UnlockEnvironmentSaga } from "./sagas";
import {
  AddWallsCommand,
  ClearPathAndExploredNodesCommand,
  ClearWallsCommand,
  RemoveWallsCommand,
  ResetGridCommand,
  SetEndNodeCommand,
  SetStartNodeCommand,
  SwapStartAndEndNodesCommand,
  LockEnvironmentCommand,
  UnlockEnvironmentCommand,
} from "@/domain/environment";
import { GlobalState } from "@/bootstrapping/GlobalState";
import { IsEnvironmentLockedQuery } from "@/domain/environment/queries/IsEnvironmentLockedQuery";

export class EnvironmentModule {
  static register(mediator: Mediator, stores: GlobalState) {
    mediator.registerCommandHandler(
      AddWallsCommand,
      new AddWallsCommandHandler(stores.gridStore)
    );
    mediator.registerCommandHandler(
      RemoveWallsCommand,
      new RemoveWallsCommandHandler(stores.gridStore)
    );
    mediator.registerCommandHandler(
      ClearWallsCommand,
      new ClearWallsCommandHandler(stores.gridStore)
    );
    mediator.registerCommandHandler(
      ClearPathAndExploredNodesCommand,
      new ClearPathAndExploredNodesCommandHandler(stores.gridStore)
    );
    mediator.registerCommandHandler(
      ResetGridCommand,
      new ResetGridCommandHandler(stores.gridStore)
    );
    mediator.registerCommandHandler(
      SwapStartAndEndNodesCommand,
      new SwapStartAndEndNodesCommandHandler(stores.gridStore)
    );
    mediator.registerCommandHandler(
      SetStartNodeCommand,
      new SetStartNodeCommandHandler(stores.gridStore)
    );
    mediator.registerCommandHandler(
      SetEndNodeCommand,
      new SetEndNodeCommandHandler(stores.gridStore)
    );
    mediator.registerCommandHandler(
      LockEnvironmentCommand,
      new LockEnvironmentCommandHandler(mediator, stores.environmentStore)
    );
    mediator.registerCommandHandler(
      UnlockEnvironmentCommand,
      new UnlockEnvironmentCommandHandler(mediator, stores.environmentStore)
    );
    mediator.registerQueryHandler(
      IsEnvironmentLockedQuery.type,
      new IsEnvironmentLockedQueryHandler(stores.environmentStore)
    );

    LockEnvironmentSaga.register(mediator);
    UnlockEnvironmentSaga.register(mediator);
  }
}
