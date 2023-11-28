import { GlobalState } from "@/bootstrapping/GlobalState";
import {
  AddWallsCommand,
  ClearPathAndExploredNodesCommand,
  ClearWallsCommand,
  IsEnvironmentLockedQuery,
  LockEnvironmentCommand,
  RemoveWallsCommand,
  ResetGridCommand,
  SetEndNodeCommand,
  SetStartNodeCommand,
  SwapStartAndEndNodesCommand,
  UnlockEnvironmentCommand,
} from "@domain/environment";
import { Mediator } from "@infra/mediator";
import {
  AddWallsCommandHandler,
  ClearPathAndExploredNodesCommandHandler,
  ClearWallsCommandHandler,
  LockEnvironmentCommandHandler,
  RemoveWallsCommandHandler,
  ResetGridCommandHandler,
  SetEndNodeCommandHandler,
  SetStartNodeCommandHandler,
  SwapStartAndEndNodesCommandHandler,
  UnlockEnvironmentCommandHandler,
} from "./command-handlers";
import { IsEnvironmentLockedQueryHandler } from "./query-handlers";
import { LockEnvironmentSaga, UnlockEnvironmentSaga } from "./sagas";

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
      IsEnvironmentLockedQuery,
      new IsEnvironmentLockedQueryHandler(stores.environmentStore)
    );

    LockEnvironmentSaga.register(mediator);
    UnlockEnvironmentSaga.register(mediator);
  }
}
