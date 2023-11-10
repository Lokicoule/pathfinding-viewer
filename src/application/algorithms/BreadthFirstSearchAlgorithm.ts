import { Grid } from "../../domain/entities/Grid";
import { Node } from "../../domain/entities/Node";
import { Queue } from "../../domain/entities/Queue";
import { Algorithm } from "../../domain/interfaces/Algorithm";

export class BreadthFirstSearchAlgorithm implements Algorithm {
  private constructor(
    private readonly grid: Grid,
    private readonly startNode: Node
  ) {}

  public static create(grid: Grid, startNode: Node): Algorithm {
    return new BreadthFirstSearchAlgorithm(grid, startNode);
  }

  public run(): Node[] {
    const visitedNodesInOrder: Node[] = [];
    const queue: Queue<Node> = new Queue();

    queue.enqueue(this.startNode);

    while (!queue.isEmpty()) {
      const currentNode = queue.dequeue();

      if (currentNode && !currentNode.isExplored() && !currentNode.isWall()) {
        if (!currentNode.isStart() && !currentNode.isEnd()) {
          currentNode.setExplored();
        }

        visitedNodesInOrder.push(currentNode);

        if (currentNode.isEnd()) {
          return visitedNodesInOrder;
        }

        const unvisitedNeighbors = this.getUnvisitedNeighbors(currentNode);

        for (const neighbor of unvisitedNeighbors) {
          neighbor.setPreviousNode(currentNode);
          queue.enqueue(neighbor);
        }
      }
    }

    return visitedNodesInOrder;
  }

  private getUnvisitedNeighbors(node: Node): Node[] {
    return this.grid
      .getNeighbors(node)
      .filter((neighbor) => !neighbor.isExplored());
  }
}
