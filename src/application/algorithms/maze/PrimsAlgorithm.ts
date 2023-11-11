import { Node } from "../../../domain/entities/Node";
import { Algorithm } from "../../../domain/interfaces/Algorithm";

export class PrimsAlgorithm implements Algorithm {
  private path: Node[] = [];

  private static readonly UP = [-2, 0];
  private static readonly DOWN = [2, 0];
  private static readonly LEFT = [0, -2];
  private static readonly RIGHT = [0, 2];

  private static readonly DIRECTIONS = [
    PrimsAlgorithm.UP,
    PrimsAlgorithm.DOWN,
    PrimsAlgorithm.LEFT,
    PrimsAlgorithm.RIGHT,
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
  ): Algorithm {
    return new PrimsAlgorithm(grid, startNode, endNode);
  }

  public run(): Node[] {
    const openNodes: Node[] = [this.startNode];

    while (openNodes.length) {
      const currentNode = openNodes[openNodes.length - 1];
      this.path.push(currentNode);

      if (!currentNode.isStart() && !currentNode.isEnd()) {
        currentNode.setExplored();
        this.path.push(currentNode.copy().setEmpty());
      }

      const neighbors = this.getUnvisitedNeighbors(currentNode);

      if (neighbors.length) {
        const randomNeighbor = this.selectRandomNode(neighbors);

        this.digPathBetweenAdjacentNodes(currentNode, randomNeighbor);

        openNodes.push(randomNeighbor);
      } else {
        openNodes.pop();
      }
    }

    if (!this.path.filter((node) => node.isEnd()).length) {
      const closestNode = this.getClosestNodeTo(this.endNode);
      this.digPath(closestNode, this.endNode);
    }

    return this.path;
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
        this.grid[(node.getVector().y + newRow) / 2][
          (node.getVector().x + newCol) / 2
        ].isWall()
      ) {
        neighbors.push(this.grid[newRow][newCol]);
      }
    }

    return neighbors;
  }

  private digPathBetweenAdjacentNodes(nodeA: Node, nodeB: Node): void {
    const midRow = (nodeA.getVector().y + nodeB.getVector().y) / 2;
    const midCol = (nodeA.getVector().x + nodeB.getVector().x) / 2;
    const midNode = this.grid[midRow][midCol];

    if (!midNode.isStart() && !midNode.isEnd()) {
      midNode.setEmpty();
    }

    this.path.push(midNode);
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

  private isValidPosition(row: number, col: number): boolean {
    return (
      row >= 0 &&
      row < this.grid.length &&
      col >= 0 &&
      col < this.grid[0].length
    );
  }

  private getRandomizedDirections() {
    const directions = [...PrimsAlgorithm.DIRECTIONS];
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
