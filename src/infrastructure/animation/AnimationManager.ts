import { PlaybackStore } from "../stores/PlaybackStore";

class AnimationManager {
  private abortController: AbortController | null = null;
  private timeouts: Map<
    number,
    { callback: () => void; delay: number; created: number }
  > = new Map();
  private pausedTimeouts: {
    callback: () => void;
    delay: number;
  }[] = [];

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

  public static create(playbackStore: PlaybackStore): AnimationManager {
    return new AnimationManager(playbackStore);
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

    this.timeouts.set(timeoutId, {
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
    const now = Date.now();
    this.timeouts.forEach((timeout, id) => {
      const remainingDelay = timeout.delay - (now - timeout.created);
      this.pausedTimeouts.push({
        callback: timeout.callback,
        delay: remainingDelay > 0 ? remainingDelay : 0,
      });
      clearTimeout(id);
    });
    this.timeouts.clear();
  }

  private resumeAnimation() {
    this.pausedTimeouts.forEach((pausedTimeout) => {
      this.createTimeout(pausedTimeout.callback, pausedTimeout.delay);
    });
    this.pausedTimeouts = [];
  }

  private stopAnimation() {
    this.timeouts.forEach((timeout, id) => {
      timeout.callback();
      clearTimeout(id);
    });
    this.pausedTimeouts.forEach((pausedTimeout, id) => {
      pausedTimeout.callback();
      clearTimeout(id);
    });
    this.timeouts.clear();
    this.pausedTimeouts = [];
    this.abortAnimation();
  }

  private abortAnimation() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  private clearAllTimeouts() {
    this.timeouts.forEach((_, timeoutId) => {
      clearTimeout(timeoutId);
    });
    this.timeouts.clear();
  }

  private removeTimeout(timeoutId: number) {
    this.timeouts.delete(timeoutId);
  }
}

export { AnimationManager };
