import { PlaybackStore } from "../stores/PlaybackStore";

class AnimationController {
  private abortController: AbortController | null = null;
  private timeouts: {
    id: number;
    callback: () => void;
    delay: number;
    created: number;
  }[] = [];
  private pausedTimeouts: { callback: () => void; remainingTime: number }[] =
    [];

  private constructor(playbackStore: PlaybackStore) {
    playbackStore.subscribe(() => {
      const playback = playbackStore.getPlayback();
      if (playback.isPlaying()) {
        this.startAnimation();
      } else if (playback.isResumed()) {
        this.resumeAnimation();
      } else if (playback.isPaused()) {
        this.pauseAnimation();
      } else if (playback.isStopped()) {
        this.stopAnimation();
      }
    });
  }

  public static create(playbackStore: PlaybackStore): AnimationController {
    return new AnimationController(playbackStore);
  }

  public createTimeout(
    callback: () => void,
    delay: number,
    created?: number
  ): void {
    const timeoutId = setTimeout(() => {
      if (this.isAnimationAborted()) {
        this.clearAllTimeouts();
        return;
      }
      callback();
      this.removeTimeout(timeoutId);
    }, delay);

    this.timeouts.push({
      id: timeoutId,
      callback,
      delay,
      created: created || Date.now(),
    });
  }

  private isAnimationAborted() {
    return this.abortController?.signal.aborted || false;
  }

  private startAnimation() {
    this.abortController = new AbortController();
  }

  private pauseAnimation() {
    this.timeouts.forEach((timeout) => {
      const elapsed = Date.now() - timeout.created;
      const remainingTime = timeout.delay - elapsed;
      this.pausedTimeouts.push({ callback: timeout.callback, remainingTime });
      clearTimeout(timeout.id);
    });
    this.timeouts = [];
  }

  private resumeAnimation() {
    this.pausedTimeouts.forEach((pausedTimeout) => {
      this.createTimeout(
        pausedTimeout.callback,
        pausedTimeout.remainingTime,
        Date.now() - pausedTimeout.remainingTime
      );
    });
    this.pausedTimeouts = [];
  }

  private stopAnimation() {
    this.timeouts.forEach((timeout) => {
      timeout.callback();
      clearTimeout(timeout.id);
    });
    this.abortAnimation();
  }

  private abortAnimation() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  private clearAllTimeouts() {
    this.timeouts.forEach((timeout) => {
      clearTimeout(timeout.id);
    });
    this.timeouts = [];
  }

  private removeTimeout(timeoutId: number) {
    this.timeouts = this.timeouts.filter((timeout) => timeout.id !== timeoutId);
  }
}

export { AnimationController };
