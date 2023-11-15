import { ExperienceStore } from "../infrastructure/stores/ExperienceStore";
import { GridStore } from "../infrastructure/stores/GridStore";
import { PlaybackStore } from "../infrastructure/stores/PlaybackStore";

export class GlobalState {
  public readonly gridStore: GridStore;
  public readonly experienceStore: ExperienceStore;
  public readonly mazePlaybackStore: PlaybackStore;
  public readonly pathfindingPlaybackStore: PlaybackStore;

  constructor(numCols: number, numRows: number) {
    this.gridStore = new GridStore(numCols, numRows);
    this.experienceStore = new ExperienceStore();
    this.mazePlaybackStore = new PlaybackStore();
    this.pathfindingPlaybackStore = new PlaybackStore();
  }
}
