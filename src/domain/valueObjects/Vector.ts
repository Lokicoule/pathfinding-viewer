export class Vector {
  constructor(public readonly x: number, public readonly y: number) {}

  public toString(): string {
    return `(x-${this.x}_y-${this.y})`;
  }
}
