import { Node } from "@domain/entities/Node";
import { Algorithm } from "@domain/interfaces/Algorithm";

export abstract class MazeAlgorithm implements Algorithm {
  protected path: Node[] = [];
  protected readonly grid: Node[][];
  protected readonly startNode: Node;
  protected readonly endNode: Node;

  protected constructor(grid: Node[][], startNode: Node, endNode: Node) {
    this.grid = grid;
    this.startNode = startNode;
    this.endNode = endNode;
  }

  public run(): Node[] {
    this.runAlgorithm();
    this.ensurePathToEndNode();
    return this.path;
  }

  protected abstract runAlgorithm(): void;

  protected digPath(nodeA: Node, nodeB: Node): void {
    const startRow = Math.min(nodeA.getVector().y, nodeB.getVector().y);
    const endRow = Math.max(nodeA.getVector().y, nodeB.getVector().y);
    const startCol = Math.min(nodeA.getVector().x, nodeB.getVector().x);
    const endCol = Math.max(nodeA.getVector().x, nodeB.getVector().x);

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const currentNode = this.grid[row][col];

        if (currentNode.isNotType("Start", "End")) {
          currentNode.setType("Empty");
          this.path.push(
            currentNode.copy().setType("Explored"),
            currentNode.copy().setType("Empty")
          );
        }
      }
    }
  }

  protected isValidPosition(row: number, col: number): boolean {
    return (
      row >= 0 &&
      row < this.grid.length &&
      col >= 0 &&
      col < this.grid[0].length
    );
  }

  protected getRandomizedDirections() {
    const DIRECTIONS = {
      UP: [-2, 0],
      DOWN: [2, 0],
      LEFT: [0, -2],
      RIGHT: [0, 2],
    };

    const directions = [...Object.values(DIRECTIONS)];
    directions.sort(() => Math.random() - 0.5);
    return directions;
  }

  protected selectRandomNode(nodes: Node[]): Node {
    const randomIndex = Math.floor(Math.random() * nodes.length);
    return nodes[randomIndex];
  }

  private ensurePathToEndNode(): void {
    if (!this.path.filter((node) => node.isType("End")).length) {
      const closestNode = this.getClosestNodeTo(this.endNode);
      this.digPath(closestNode, this.endNode);
    }
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
