import { Node } from "../../../domain/entities/Node";
import { Algorithm } from "../../../domain/interfaces/Algorithm";
import { MazeAlgorithm } from "./MazeAlgorithm";

export class PrimsAlgorithm extends MazeAlgorithm {
  private constructor(grid: Node[][], startNode: Node, endNode: Node) {
    super(grid, startNode, endNode);
  }

  public static create(
    grid: Node[][],
    startNode: Node,
    endNode: Node
  ): Algorithm {
    return new PrimsAlgorithm(grid, startNode, endNode);
  }

  public runAlgorithm(): void {
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
}
