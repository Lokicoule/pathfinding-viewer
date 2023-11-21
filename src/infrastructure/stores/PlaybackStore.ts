import { Playback, PlaybackValue } from "@domain/animation";
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

    this.setState(this.state);
  }

  public isPaused(): boolean {
    return this.state.playback.isPaused();
  }

  public isStopped(): boolean {
    return this.state.playback.isStopped();
  }

  public isResumed(): boolean {
    return this.state.playback.isResumed();
  }
}
