import { InitializeGridCommand } from "..";
import { Grid } from "../../../domain/entities/Grid";
import { Handler } from "../../../shared/bases/Handler";
import { CompositionRoot } from "../../CompositionRoot";

const cellSize = 30;
const percentWidth = 80;
const percentHeight = 80;

const fullWidth = window.innerWidth;
const fullHeight = window.innerHeight;

const numCols = Math.floor(((percentWidth / 100) * fullWidth) / cellSize);
const numRows = Math.floor(((percentHeight / 100) * fullHeight) / cellSize);

export class InitializeGridCommandHandler extends Handler<InitializeGridCommand> {
  private constructor(compositionRoot: CompositionRoot) {
    super(compositionRoot, InitializeGridCommandHandler.name);
  }

  public static create(
    compositionRoot: CompositionRoot
  ): InitializeGridCommandHandler {
    return new InitializeGridCommandHandler(compositionRoot);
  }

  public setupSubscription(): void {
    this.compositionRoot.eventBus.subscribe(InitializeGridCommand.name, this);
  }

  public handle(): void {
    console.log("Initializing grid...");
    const grid = Grid.create({
      cols: numCols,
      rows: numRows,
    });

    this.compositionRoot.cache.set("grid", grid);
  }
}
