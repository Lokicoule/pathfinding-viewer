import { Grid } from "@domain/entities/Grid";
import { Node } from "@domain/entities/Node";
import { Algorithm } from "@domain/interfaces/Algorithm";
import { Queue } from "@infra/datastructures";

export abstract class PathfindingAlgorithm implements Algorithm {
  protected queue: Queue<Node>;
  protected readonly grid: Grid;
  protected readonly startNode: Node;
  protected readonly endNode: Node;

  protected constructor(grid: Grid, startNode: Node, endNode: Node) {
    this.queue = new Queue<Node>();
    this.grid = grid;
    this.startNode = startNode;
    this.endNode = endNode;
  }

  public run(): Node[] {
    this.runAlgorithm();

    return this.queue.toArray();
  }

  protected abstract runAlgorithm(): void;

  protected getUnvisitedNeighbors(node: Node): Node[] {
    return this.grid
      .getNeighbors(node)
      .filter((neighbor) => !neighbor.isExplored());
  }

  protected calculateDistance(node1: Node, node2: Node): number {
    return Math.sqrt(
      Math.pow(node1.getVector().x - node2.getVector().x, 2) +
        Math.pow(node1.getVector().y - node2.getVector().y, 2)
    );
  }
}
