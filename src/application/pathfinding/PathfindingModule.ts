import { GlobalState } from "@/bootstrapping/GlobalState";
import {
  PathfindingAnimationCommand,
  PathfindingRunnerCommand,
} from "@domain/pathfinding";
import { Mediator } from "@infra/mediator";
import {
  PathfindingAnimationCommandHandler,
  PathfindingRunnerCommandHandler,
} from "./command-handlers";
import { PathfindingCompletionSaga } from "./sagas";

export class PathfindingModule {
  public static register(mediator: Mediator, stores: GlobalState) {
    mediator.registerCommandHandler(
      PathfindingRunnerCommand,
      new PathfindingRunnerCommandHandler(mediator, stores.gridStore)
    );
    mediator.registerCommandHandler(
      PathfindingAnimationCommand,
      new PathfindingAnimationCommandHandler(
        mediator,
        stores.gridStore,
        stores.animationStore
      )
    );

    PathfindingCompletionSaga.register(mediator);
  }
}
