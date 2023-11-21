import { Node } from "@domain/environment";
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

    if (node.isNotType("Start", "End")) {
      node.setType("Explored");
      this.path.push(node.copy(), node.copy().setType("Empty"));
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
    if (neighbors.length === 0 && node.isNotType("Start", "End")) {
      node.setType("Wall");
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
        !this.grid[newRow][newCol].isType("Explored") &&
        (this.isMidNodeWall(newRow, newCol, node) ||
          this.grid[(node.getVector().y + newRow) / 2][
            (node.getVector().x + newCol) / 2
          ].isType("End"))
      ) {
        neighbors.push(this.grid[newRow][newCol]);
      }
    }

    return neighbors.filter((neighbor) => !neighbor.isType("Explored"));
  }

  private isMidNodeWall(row: number, col: number, node: Node): boolean {
    const midRow = (node.getVector().y + row) / 2;
    const midCol = (node.getVector().x + col) / 2;

    return this.grid[midRow][midCol].isType("Wall");
  }
}
