import { Grid } from "../../../domain/entities/Grid";
import { Node } from "../../../domain/entities/Node";
import { PriorityQueue } from "../../../infrastructure/datastructures/PriorityQueue";
import { Algorithm } from "../../../domain/interfaces/Algorithm";

export class AStarAlgorithm implements Algorithm {
  private constructor(
    private readonly grid: Grid,
    private readonly startNode: Node,
    private readonly endNode: Node
  ) {}

  public static create(grid: Grid, startNode: Node, endNode: Node): Algorithm {
    return new AStarAlgorithm(grid, startNode, endNode);
  }

  public run(): Node[] {
    const visitedNodesInOrder: Node[] = [];
    const priorityQueue = new PriorityQueue<Node>();

    this.startNode.setG(0);
    this.startNode.setH(this.calculateHeuristic(this.startNode, this.endNode));
    priorityQueue.enqueue(this.startNode, this.startNode.getTotalCost());

    while (!priorityQueue.isEmpty()) {
      const currentNode = priorityQueue.dequeue();

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
          const tentativeG = currentNode.getG() + 1;

          if (tentativeG < neighbor.getG()) {
            neighbor.setPreviousNode(currentNode);
            neighbor.setG(tentativeG);
            neighbor.setH(this.calculateHeuristic(neighbor, this.endNode));
            priorityQueue.enqueue(neighbor, neighbor.getTotalCost());
          }
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

  private calculateHeuristic(nodeA: Node, nodeB: Node): number {
    return Math.sqrt(
      Math.pow(nodeA.getVector().x - nodeB.getVector().x, 2) +
        Math.pow(nodeA.getVector().y - nodeB.getVector().y, 2)
    );
  }
}
