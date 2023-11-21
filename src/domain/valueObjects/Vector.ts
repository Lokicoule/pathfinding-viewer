export class Vector {
  constructor(public readonly x: number, public readonly y: number) {}

  public static equals(vector1: Vector, vector2: Vector): boolean {
    return vector1.x === vector2.x && vector1.y === vector2.y;
  }
}
