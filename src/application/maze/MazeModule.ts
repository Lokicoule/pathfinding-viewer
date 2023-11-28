import { GlobalState } from "@/bootstrapping/GlobalState";
import { MazeAnimationCommand, MazeRunnerCommand } from "@domain/maze";
import { Mediator } from "@infra/mediator";
import {
  MazeAnimationCommandHandler,
  MazeRunnerCommandHandler,
} from "./command-handlers";
import { MazeCompletionSaga } from "./sagas";

export class MazeModule {
  static register(mediator: Mediator, stores: GlobalState) {
    mediator.registerCommandHandler(
      MazeAnimationCommand,
      new MazeAnimationCommandHandler(
        mediator,
        stores.gridStore,
        stores.animationStore
      )
    );

    mediator.registerCommandHandler(
      MazeRunnerCommand,
      new MazeRunnerCommandHandler(mediator, stores.gridStore)
    );

    MazeCompletionSaga.register(mediator);
  }
}
