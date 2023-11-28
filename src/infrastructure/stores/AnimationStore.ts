import { Playback, PlaybackValue, Speed } from "@domain/animation";
import { Store } from "../store/Store";

export type AnimationStoreState = {
  speed: Speed;
  isActivated: boolean;
  playback: Playback;
};

export class AnimationStore extends Store<AnimationStoreState> {
  constructor() {
    super({
      speed: Speed.create(Speed.FAST),
      isActivated: true,
      playback: Playback.create("STOP"),
    });
  }

  public setSpeed(speed: Speed) {
    this.state.speed = speed;
    this.setState(this.state);
  }

  public getSpeed(): Speed {
    return this.state.speed;
  }

  public toggle() {
    this.state.isActivated = !this.state.isActivated;
    this.setState(this.state);
  }

  public isActivated(): boolean {
    return this.state.isActivated;
  }

  public getPlayback(): Playback {
    return this.state.playback;
  }

  public setPlayback(playback: PlaybackValue) {
    this.state.playback = Playback.create(playback);

    this.setState(this.state);
  }
}
