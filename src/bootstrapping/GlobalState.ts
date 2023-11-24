import { EnvironmentStore } from "@/infrastructure/stores/EnvironmentStore";
import {
  AlgorithmStore,
  AnimationStore,
  GridStore,
  PlaybackStore,
} from "@infra/stores";

export class GlobalState {
  public readonly gridStore: GridStore;
  public readonly algorithmStore: AlgorithmStore;
  public readonly mazePlaybackStore: PlaybackStore;
  public readonly pathfindingPlaybackStore: PlaybackStore;
  public readonly animationStore: AnimationStore;
  public readonly environmentStore: EnvironmentStore;

  constructor(numCols: number, numRows: number) {
    this.gridStore = new GridStore(numCols, numRows);
    this.algorithmStore = new AlgorithmStore();
    this.mazePlaybackStore = new PlaybackStore();
    this.pathfindingPlaybackStore = new PlaybackStore();
    this.animationStore = new AnimationStore();
    this.environmentStore = new EnvironmentStore();
  }
}
