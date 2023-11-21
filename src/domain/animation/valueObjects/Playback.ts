export type PlaybackValue = "PLAY" | "PAUSE" | "STOP" | "RESUME";

export class Playback {
  private constructor(public readonly value: PlaybackValue) {}

  public static create(value: PlaybackValue): Playback {
    return new Playback(value);
  }

  public isPlaying(): boolean {
    return this.value === "PLAY";
  }

  public isPaused(): boolean {
    return this.value === "PAUSE";
  }

  public isStopped(): boolean {
    return this.value === "STOP";
  }

  public isResumed(): boolean {
    return this.value === "RESUME";
  }
}
