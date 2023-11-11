import { Node } from "../../../domain/entities/Node";
import { Algorithm } from "../../../domain/interfaces/Algorithm";

export class DepthFirstSearchMazeAlgorithm implements Algorithm {
  private path: Node[] = [];

  private static readonly UP = [-2, 0];
  private static readonly DOWN = [2, 0];
  private static readonly LEFT = [0, -2];
  private static readonly RIGHT = [0, 2];

  private static readonly DIRECTIONS = [
    DepthFirstSearchMazeAlgorithm.UP,
    DepthFirstSearchMazeAlgorithm.DOWN,
    DepthFirstSearchMazeAlgorithm.LEFT,
    DepthFirstSearchMazeAlgorithm.RIGHT,
  ];

  private constructor(
    private readonly grid: Node[][],
    private readonly startNode: Node,
    private readonly endNode: Node
  ) {}

  public static create(
    grid: Node[][],
    startNode: Node,
    endNode: Node
  ): DepthFirstSearchMazeAlgorithm {
    return new DepthFirstSearchMazeAlgorithm(grid, startNode, endNode);
  }

  public run(): Node[] {
    this.backtrack(this.startNode);

    if (!this.path.filter((node) => node.isEnd()).length) {
      const closestNode = this.getClosestNodeTo(this.endNode);
      this.digPath(closestNode, this.endNode);
    }

    return this.path;
  }

  private backtrack(node: Node): void {
    this.path.push(node);

    if (!node.isStart() && !node.isEnd()) {
      node.setExplored();
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

  private digPath(nodeA: Node, nodeB: Node): void {
    const startRow = Math.min(nodeA.getVector().y, nodeB.getVector().y);
    const endRow = Math.max(nodeA.getVector().y, nodeB.getVector().y);
    const startCol = Math.min(nodeA.getVector().x, nodeB.getVector().x);
    const endCol = Math.max(nodeA.getVector().x, nodeB.getVector().x);

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const currentNode = this.grid[row][col];

        if (!currentNode.isStart() && !currentNode.isEnd()) {
          currentNode.setEmpty();
          this.path.push(currentNode.copy().setEmpty());
        }
      }
    }
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

  private isValidPosition(row: number, col: number): boolean {
    return (
      row >= 0 &&
      row < this.grid.length &&
      col >= 0 &&
      col < this.grid[0].length
    );
  }

  private isMidNodeWall(row: number, col: number, node: Node): boolean {
    const midRow = (node.getVector().y + row) / 2;
    const midCol = (node.getVector().x + col) / 2;

    return this.grid[midRow][midCol].isWall();
  }

  private getRandomizedDirections() {
    const directions = [...DepthFirstSearchMazeAlgorithm.DIRECTIONS];
    directions.sort(() => Math.random() - 0.5);
    return directions;
  }

  private selectRandomNode(nodes: Node[]): Node {
    const randomIndex = Math.floor(Math.random() * nodes.length);
    return nodes[randomIndex];
  }

  private getClosestNodeTo(nodeTo: Node): Node {
    let closestNode = this.path[0];
    let closestNodeDistance = Infinity;

    for (const node of this.path) {
      const distance = this.calculateDistance(node, nodeTo);

      if (distance < closestNodeDistance) {
        closestNode = node;
        closestNodeDistance = distance;
      }
    }

    return closestNode;
  }

  private calculateDistance(node1: Node, node2: Node): number {
    return Math.sqrt(
      Math.pow(node1.getVector().x - node2.getVector().x, 2) +
        Math.pow(node1.getVector().y - node2.getVector().y, 2)
    );
  }
}
