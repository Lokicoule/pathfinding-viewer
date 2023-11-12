class AnimationController {
  private abortController: AbortController | null = null;
  private timeouts: number[] = [];

  private constructor() {}

  static create(): AnimationController {
    return new AnimationController();
  }

  startAnimation() {
    this.abortController = new AbortController();
  }

  abortAnimation() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  isAnimationAborted() {
    return this.abortController?.signal.aborted || false;
  }

  createTimeout(callback: () => void, delay: number): void {
    const timeout = setTimeout(() => {
      if (this.isAnimationAborted()) {
        this.clearAllTimeouts();
        return;
      }
      callback();
    }, delay);

    this.timeouts.push(timeout);
  }

  private clearAllTimeouts() {
    this.timeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
    this.timeouts = [];
  }

  stopAnimation() {
    this.clearAllTimeouts();
    this.abortAnimation();
  }
}

export { AnimationController };
