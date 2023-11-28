import { EnvironmentStore } from "@/infrastructure/stores/EnvironmentStore";
import { AlgorithmStore, AnimationStore, GridStore } from "@infra/stores";

export class GlobalState {
  public readonly gridStore: GridStore;
  public readonly algorithmStore: AlgorithmStore;
  public readonly animationStore: AnimationStore;
  public readonly environmentStore: EnvironmentStore;

  constructor(numCols: number, numRows: number) {
    this.gridStore = new GridStore(numCols, numRows);
    this.algorithmStore = new AlgorithmStore();
    this.animationStore = new AnimationStore();
    this.environmentStore = new EnvironmentStore();
  }
}
