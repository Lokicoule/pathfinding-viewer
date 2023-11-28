import { GlobalState } from "@/bootstrapping/GlobalState";
import {
  PauseAnimationCommand,
  PlayAnimationCommand,
  ResumeAnimationCommand,
  StopAnimationCommand,
  ToggleAnimationCommand,
  UpdateSpeedCommand,
} from "@domain/animation";
import { Mediator } from "@infra/mediator";
import {
  PauseAnimationCommandHandler,
  PlayAnimationCommandHandler,
  ResumeAnimationCommandHandler,
  StopAnimationCommandHandler,
  ToggleAnimationCommandHandler,
  UpdateSpeedCommandHandler,
} from "./command-handlers";

export class AnimationModule {
  static register(mediator: Mediator, stores: GlobalState) {
    mediator.registerCommandHandler(
      PlayAnimationCommand,
      new PlayAnimationCommandHandler(mediator, stores.animationStore)
    );
    mediator.registerCommandHandler(
      PauseAnimationCommand,
      new PauseAnimationCommandHandler(stores.animationStore)
    );
    mediator.registerCommandHandler(
      StopAnimationCommand,
      new StopAnimationCommandHandler(mediator, stores.animationStore)
    );
    mediator.registerCommandHandler(
      ResumeAnimationCommand,
      new ResumeAnimationCommandHandler(stores.animationStore)
    );
    mediator.registerCommandHandler(
      ToggleAnimationCommand,
      new ToggleAnimationCommandHandler(stores.animationStore)
    );
    mediator.registerCommandHandler(
      UpdateSpeedCommand,
      new UpdateSpeedCommandHandler(stores.animationStore)
    );
  }
}
