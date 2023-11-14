class AnimationController {
  private abortController: AbortController | null = null;
  private timeouts: number[] = [];

  private constructor() {}

  static create(): AnimationController {
    return new AnimationController();
  }

  public startAnimation() {
    this.abortController = new AbortController();
  }

  public abortAnimation() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  public isAnimationAborted() {
    return this.abortController?.signal.aborted || false;
  }

  public createTimeout(callback: () => void, delay: number): void {
    const timeout = setTimeout(() => {
      if (this.isAnimationAborted()) {
        this.clearAllTimeouts();
        return;
      }
      callback();
    }, delay);

    this.timeouts.push(timeout);
  }

  public stopAnimation() {
    this.clearAllTimeouts();
    this.abortAnimation();
  }

  private clearAllTimeouts() {
    this.timeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
    this.timeouts = [];
  }
}

export { AnimationController };
