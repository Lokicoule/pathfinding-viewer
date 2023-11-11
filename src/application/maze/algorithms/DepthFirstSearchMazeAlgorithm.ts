import { Node } from "../../../domain/entities/Node";
import { MazeAlgorithm } from "./MazeAlgorithm";

export class DepthFirstSearchMazeAlgorithm extends MazeAlgorithm {
  private constructor(grid: Node[][], startNode: Node, endNode: Node) {
    super(grid, startNode, endNode);
  }

  public static create(
    grid: Node[][],
    startNode: Node,
    endNode: Node
  ): DepthFirstSearchMazeAlgorithm {
    return new DepthFirstSearchMazeAlgorithm(grid, startNode, endNode);
  }

  public runAlgorithm(): void {
    this.backtrack(this.startNode);
  }

  private backtrack(node: Node): void {
    this.path.push(node);

    if (!node.isStart() && !node.isEnd()) {
      node.setExplored();
      this.path.push(node.copy(), node.copy().setEmpty());
    }

    const neighbors = this.getUnvisitedNeighbors(node);

    while (neighbors.length) {
      const selectedNeighbor = this.selectRandomNode(neighbors);

      if (!this.path.includes(selectedNeighbor)) {
        this.digPath(node, selectedNeighbor);
        this.backtrack(selectedNeighbor);
      }

      neighbors.splice(neighbors.indexOf(selectedNeighbor), 1);
    }

    this.resetNodeIfAllNeighborsExplored(node, neighbors);
  }

  private resetNodeIfAllNeighborsExplored(node: Node, neighbors: Node[]): void {
    if (neighbors.length === 0 && !node.isStart() && !node.isEnd()) {
      node.setWall();
    }
  }

  private getUnvisitedNeighbors(node: Node): Node[] {
    const neighbors = [];

    const directions = this.getRandomizedDirections();

    for (const [dx, dy] of directions) {
      const newRow = node.getVector().y + dy;
      const newCol = node.getVector().x + dx;

      if (
        this.isValidPosition(newRow, newCol) &&
        !this.grid[newRow][newCol].isExplored() &&
        (this.isMidNodeWall(newRow, newCol, node) ||
          this.grid[(node.getVector().y + newRow) / 2][
            (node.getVector().x + newCol) / 2
          ].isEnd())
      ) {
        neighbors.push(this.grid[newRow][newCol]);
      }
    }

    return neighbors.filter((neighbor) => !neighbor.isExplored());
  }

  private isMidNodeWall(row: number, col: number, node: Node): boolean {
    const midRow = (node.getVector().y + row) / 2;
    const midCol = (node.getVector().x + col) / 2;

    return this.grid[midRow][midCol].isWall();
  }
}
