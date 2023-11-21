export class Speed {
  private ms: number;
  public static readonly FAST = 0;
  public static readonly SLOW = 75;

  private constructor(ms: number) {
    this.validate(ms);

    this.ms = ms;
  }

  public static create(ms: number): Speed {
    return new Speed(ms);
  }

  public getValue(): number {
    return this.ms;
  }

  public static reverse(ms: number): number {
    return this.FAST + this.SLOW - ms;
  }

  public static isValidSpeed(ms: number): boolean {
    return ms >= Speed.FAST && ms <= Speed.SLOW;
  }

  private validate(ms: number): void {
    if (!Speed.isValidSpeed(ms)) {
      throw new Error(
        `Speed must be between ${Speed.FAST} and ${Speed.SLOW} ms, got ${ms}`
      );
    }
  }
}
