import { ResetGridCommand } from "..";
import { Handler } from "../../EventBus";
import { CompositionRoot } from "../../composition";

export class ResetGridCommandHandler extends Handler<ResetGridCommand> {
  private constructor(compositionRoot: CompositionRoot) {
    super(compositionRoot, ResetGridCommandHandler.name);

    this.setupSubscriptions();
  }

  public static create(
    compositionRoot: CompositionRoot
  ): ResetGridCommandHandler {
    return new ResetGridCommandHandler(compositionRoot);
  }

  public handle(): void {
    const grid = this.compositionRoot.cache.get("grid");

    grid.reset();
  }

  private setupSubscriptions(): void {
    this.compositionRoot.eventBus.subscribe(ResetGridCommand.name, this);
  }
}
