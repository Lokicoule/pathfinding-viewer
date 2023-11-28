import { Mediator } from "@/infrastructure/mediator";

import {
  PauseAnimationCommandHandler,
  PlayAnimationCommandHandler,
  ResumeAnimationCommandHandler,
  StopAnimationCommandHandler,
  ToggleAnimationCommandHandler,
  UpdateSpeedCommandHandler,
} from "./command-handlers";
import { PlayAnimationCommand } from "@/domain/animation/commands/PlayAnimationCommand";
import { PauseAnimationCommand } from "@/domain/animation/commands/PauseAnimationCommand";
import { StopAnimationCommand } from "@/domain/animation/commands/StopAnimationCommand";
import { ResumeAnimationCommand } from "@/domain/animation/commands/ResumeAnimationCommand";
import { ToggleAnimationCommand, UpdateSpeedCommand } from "@/domain/animation";
import { GlobalState } from "@/bootstrapping/GlobalState";

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
