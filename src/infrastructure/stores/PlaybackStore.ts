import { Playback, PlaybackValue } from "../../domain/valueObjects/Playback";
import { Store } from "../store/Store";

export type PlaybackStoreState = {
  playback: Playback;
};

export class PlaybackStore extends Store<PlaybackStoreState> {
  constructor() {
    super({
      playback: Playback.create("STOP"),
    });
  }

  public getPlayback(): Playback {
    return this.state.playback;
  }

  public setPlayback(playback: PlaybackValue) {
    this.state.playback = Playback.create(playback);
    console.log("PlaybackStore.setPlayback()", this.state.playback);

    this.setState(this.state);
  }

  public isPaused(): boolean {
    console.log("PlaybackStore.isPaused()", this.state.playback);
    return this.state.playback.isPaused();
  }

  public isStopped(): boolean {
    return this.state.playback.isStopped();
  }

  public isResumed(): boolean {
    return this.state.playback.isResumed();
  }
}
