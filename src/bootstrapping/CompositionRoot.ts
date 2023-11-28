import { AlgorithmModule } from "@app/algorithm";
import { AnimationModule } from "@app/animation";
import { EnvironmentModule } from "@app/environment";
import { MazeModule } from "@app/maze";
import { PathfindingModule } from "@app/pathfinding";
import { Mediator } from "@infra/mediator";
import { GlobalState } from "./GlobalState";

export class CompositionRoot {
  private constructor(
    public readonly mediator: Mediator,
    public readonly stores: GlobalState
  ) {
    this.initialize();
  }

  public static create(numCols: number, numRows: number) {
    const mediator = new Mediator();

    return new CompositionRoot(mediator, new GlobalState(numCols, numRows));
  }

  public initialize() {
    AlgorithmModule.register(this.mediator, this.stores);
    AnimationModule.register(this.mediator, this.stores);
    EnvironmentModule.register(this.mediator, this.stores);
    MazeModule.register(this.mediator, this.stores);
    PathfindingModule.register(this.mediator, this.stores);
  }
}
