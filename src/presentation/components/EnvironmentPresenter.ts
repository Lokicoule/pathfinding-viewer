import { GlobalCache } from "../../application/GlobalCache";
import { Grid } from "../../domain/entities/Grid";
import { Presenter } from "../../shared/bases/Presenter";
import { SubscriptionManager } from "../SubscriptionManager";
import { EnvironmentViewModel } from "./EnvironmentViewModel";

export class EnvironmentPresenter extends Presenter<EnvironmentViewModel> {
  private subscriptionManager: SubscriptionManager;

  private constructor(cache: GlobalCache) {
    super(cache);
    this.subscriptionManager = new SubscriptionManager(
      cache,
      "grid",
      EnvironmentPresenter.name,
      (grid) => this.handleGridChange(grid)
    );
  }

  public static create(cache: GlobalCache): EnvironmentPresenter {
    return new EnvironmentPresenter(cache);
  }

  private handleGridChange(grid: Grid) {
    this.rebuildViewModel(grid);
    this.cb(this.vm);
  }

  protected rebuildViewModel(grid: Grid) {
    this.vm = EnvironmentViewModel.create({
      grid,
      cellSize: 30,
    });
  }

  public load(cb: (vm?: EnvironmentViewModel) => void): void {
    this.rebuildViewModel(this.subscriptionManager.getValue());

    super.load(cb);
  }

  public unload(): void {
    this.subscriptionManager.unsubscribe();

    super.unload();
  }
}
