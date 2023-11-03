export class Vector {
  constructor(public readonly x: number, public readonly y: number) {}

  public equals(vector: Vector): boolean {
    return this.x === vector.x && this.y === vector.y;
  }
}
