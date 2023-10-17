import { ResetGridCommand } from "..";
import { Handler } from "../../../shared/bases/Handler";
import { CompositionRoot } from "../../CompositionRoot";

export class ResetGridCommandHandler extends Handler<ResetGridCommand> {
  private constructor(compositionRoot: CompositionRoot) {
    super(compositionRoot, ResetGridCommandHandler.name);
  }

  public static create(
    compositionRoot: CompositionRoot
  ): ResetGridCommandHandler {
    return new ResetGridCommandHandler(compositionRoot);
  }

  public setupSubscription(): void {
    this.compositionRoot.eventBus.subscribe(ResetGridCommand.name, this);
  }

  public handle(): void {
    const grid = this.compositionRoot.cache.get("grid");

    grid.reset();
  }
}
