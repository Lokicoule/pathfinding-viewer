import { AnimationStore } from "@infra/stores/AnimationStore";
import { AlgorithmStore } from "@infra/stores/AlgorithmStore";
import { GridStore } from "@infra/stores/GridStore";
import { PlaybackStore } from "@infra/stores/PlaybackStore";

export class GlobalState {
  public readonly gridStore: GridStore;
  public readonly algorithmStore: AlgorithmStore;
  public readonly mazePlaybackStore: PlaybackStore;
  public readonly pathfindingPlaybackStore: PlaybackStore;
  public readonly animationStore: AnimationStore;

  constructor(numCols: number, numRows: number) {
    this.gridStore = new GridStore(numCols, numRows);
    this.algorithmStore = new AlgorithmStore();
    this.mazePlaybackStore = new PlaybackStore();
    this.pathfindingPlaybackStore = new PlaybackStore();
    this.animationStore = new AnimationStore();
  }
}
