import { AddWallCommandHandler } from "../application/command-handlers/AddWallCommandHandler";
import { RemoveWallCommandHandler } from "../application/command-handlers/RemoveWallCommandHandler";
import { ResetGridCommandHandler } from "../application/command-handlers/ResetGridCommandHandler";
import { SetEndNodeCommandHandler } from "../application/command-handlers/SetEndNodeCommandHandler";
import { SetSelectedNodeTypeCommandHandler } from "../application/command-handlers/SetSelectedNodeTypeCommandHandler";
import { SetStartNodeCommandHandler } from "../application/command-handlers/SetStartNodeCommandHandler";
import { AddWallCommand } from "../domain/commands/AddWallCommand";
import { RemoveWallCommand } from "../domain/commands/RemoveWallCommand";
import { ResetGridCommand } from "../domain/commands/ResetGridCommand";
import { SetEndNodeCommand } from "../domain/commands/SetEndNodeCommand";
import { SetSelectedNodeTypeCommand } from "../domain/commands/SetSelectedNodeTypeCommand";
import { SetStartNodeCommand } from "../domain/commands/SetStartNodeCommand";
import { Mediator } from "../infrastructure/mediator/Mediator";
import { ExperienceStore } from "../infrastructure/stores/ExperienceStore";
import { GridStore } from "../infrastructure/stores/GridStore";

export class CompositionRoot {
  private constructor(
    public readonly mediator: Mediator,
    public readonly gridStore: GridStore,
    public readonly experienceStore: ExperienceStore
  ) {
    this.initialize();
  }

  public static create(numCols: number, numRows: number) {
    const mediator = new Mediator();
    const gridStore = new GridStore(numCols, numRows);
    const experienceStore = new ExperienceStore();

    return new CompositionRoot(mediator, gridStore, experienceStore);
  }

  public initialize() {
    this.mediator.registerCommandHandler(
      AddWallCommand.name,
      new AddWallCommandHandler(this.mediator, this.gridStore)
    );
    this.mediator.registerCommandHandler(
      RemoveWallCommand.name,
      new RemoveWallCommandHandler(this.mediator, this.gridStore)
    );
    this.mediator.registerCommandHandler(
      SetStartNodeCommand.name,
      new SetStartNodeCommandHandler(this.mediator, this.gridStore)
    );
    this.mediator.registerCommandHandler(
      SetEndNodeCommand.name,
      new SetEndNodeCommandHandler(this.mediator, this.gridStore)
    );
    this.mediator.registerCommandHandler(
      ResetGridCommand.name,
      new ResetGridCommandHandler(this.mediator, this.gridStore)
    );
    this.mediator.registerCommandHandler(
      SetSelectedNodeTypeCommand.name,
      new SetSelectedNodeTypeCommandHandler(this.experienceStore)
    );
  }
}
