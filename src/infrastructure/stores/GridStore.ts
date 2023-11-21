import { Grid, Node, NodeType, Vector } from "@domain/environment";
import { Result } from "@domain/types/Result";
import { Store } from "../store/Store";

export type GridStoreState = {
  grid: Grid;
  startNode: Node;
  endNode: Node;
};

export class GridStore extends Store<GridStoreState> {
  constructor(width: number, height: number) {
    super({
      grid: Grid.create(width, height),
      startNode: Node.create({
        vector: { x: 1, y: 1 },
        type: "Start",
      }),
      endNode: Node.create({
        type: "End",
        vector: { x: width - 2, y: height - 2 },
      }),
    });

    this.state.grid.initialize(
      "Empty",
      this.state.startNode.getVector(),
      this.state.endNode.getVector()
    );
  }

  public getGrid(): Grid {
    return this.state.grid;
  }

  public setGrid(grid: Grid): void {
    this.state.grid = grid;
    super.setState(this.state);
  }

  public getNode(vector: Vector): Node | undefined {
    if (this.isValidPosition(vector)) {
      return this.state.grid.getNode(vector.x, vector.y);
    }
    return undefined;
  }

  public getStartNode(): Node {
    return this.state.startNode;
  }

  public setStartNode(vector: Vector): Result {
    const rollback = this.getNode(vector);
    const validation = this.setNodeAs(vector, "Start");

    if (validation.success) {
      const validationEmpty = this.setNodeAs(
        this.state.startNode.getVector(),
        "Empty"
      );

      if (!validationEmpty.success && rollback) {
        this.setNodeAs(rollback.getVector(), "Start");
        return validationEmpty;
      }

      this.state.startNode = this.state.grid.getNode(vector.x, vector.y);

      return { success: true };
    }

    return validation;
  }

  public getEndNode(): Node {
    return this.state.endNode;
  }

  public setEndNode(vector: Vector): Result {
    const rollback = this.getNode(vector);

    const validation = this.setNodeAs(vector, "End");

    if (validation.success) {
      const emptyValidation = this.setNodeAs(
        this.state.endNode.getVector(),
        "Empty"
      );

      if (!emptyValidation.success && rollback) {
        this.setNodeAs(rollback.getVector(), "End");
        return emptyValidation;
      }

      this.state.endNode = this.state.grid.getNode(vector.x, vector.y);

      return { success: true };
    }

    return validation;
  }

  public setNodeAs(vector: Vector, type: NodeType): Result {
    const validation = this.isValidPosition(vector);

    if (validation.success) {
      this.state.grid.setNodeAs(vector, type);

      super.setState(this.state);
      return { success: true };
    }

    return validation;
  }

  public swapNodes(vectorA: Vector, vectorB: Vector): Result {
    const validationA = this.isValidPosition(vectorA);
    const validationB = this.isValidPosition(vectorB);

    if (validationA.success && validationB.success) {
      this.state.grid.swapNodes(vectorA, vectorB);

      super.setState(this.state);
      return { success: true };
    }

    return validationA.success ? validationB : validationA;
  }

  public swapStartAndEndNodes(): Result {
    const validation = this.swapNodes(
      this.state.startNode.getVector(),
      this.state.endNode.getVector()
    );

    if (validation.success) {
      const startNode = this.state.grid.getNode(
        this.state.startNode.getVector().x,
        this.state.startNode.getVector().y
      );

      const endNode = this.state.grid.getNode(
        this.state.endNode.getVector().x,
        this.state.endNode.getVector().y
      );

      this.state.startNode = endNode;
      this.state.endNode = startNode;

      super.setState(this.state);
      return { success: true };
    }

    return validation;
  }

  public reset(): void {
    this.state.grid.initialize(
      "Empty",
      new Vector(1, 1),
      new Vector(this.state.grid.width - 2, this.state.grid.height - 2)
    );

    this.state.startNode = this.state.grid.getNode(1, 1);
    this.state.endNode = this.state.grid.getNode(
      this.state.grid.width - 2,
      this.state.grid.height - 2
    );

    super.setState(this.state);
  }

  private isValidPosition(vector: Vector): Result {
    if (this.state.grid.isValidPosition(vector)) {
      return { success: true };
    }

    return {
      success: false,
      error: {
        message: `Invalid position: (${vector.x}, ${vector.y})`,
      },
    };
  }

  public clear(...nodeTypes: NodeType[]): void {
    this.state.grid.clear(...nodeTypes);

    super.setState(this.state);
  }

  public addWalls(nodes: Node[]): void {
    nodes.forEach((node) => {
      this.state.grid.setNodeAs(node.getVector(), "Wall");
    });

    super.setState(this.state);
  }

  public removeWalls(nodes: Node[]): void {
    nodes.forEach((node) => {
      this.state.grid.setNodeAs(node.getVector(), "Empty");
    });

    super.setState(this.state);
  }
}
