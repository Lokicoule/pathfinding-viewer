import { Speed } from "../../domain/valueObjects/Speed";
import { Store } from "../store/Store";

export type AnimationStoreState = {
  speed: Speed;
  isActivated: boolean;
};

export class AnimationStore extends Store<AnimationStoreState> {
  constructor() {
    super({
      speed: Speed.create(Speed.FAST),
      isActivated: true,
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
}
