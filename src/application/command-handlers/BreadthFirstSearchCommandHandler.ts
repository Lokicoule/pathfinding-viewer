import { BreadthFirstSearchCommand } from "../../domain/commands/BreadthFirstSearchCommand";
import { Node } from "../../domain/entities/Node";
import { NodeType } from "../../domain/enums/NodeType";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Mediator } from "../mediator/Mediator";
import { GridStore } from "../stores/GridStore";

export class BreadthFirstSearchCommandHandler
  implements CommandHandler<BreadthFirstSearchCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(): void {
    const grid = this.cloneGrid(this.gridStore.getGrid());
    const startNode =
      grid[this.gridStore.getStartNode().getVector().y][
        this.gridStore.getStartNode().getVector().x
      ];
    const endNode =
      grid[this.gridStore.getEndNode().getVector().y][
        this.gridStore.getEndNode().getVector().x
      ];
    const visitedNodesInOrder = this.breadthFirstSearch(
      grid,
      startNode,
      endNode
    );

    console.log(visitedNodesInOrder);

    this.animateBreadthFirstSearch(visitedNodesInOrder).then(() => {
      const shortestPath = this.getShortestPath(endNode);
      console.log("shortestPath", shortestPath);
      this.animateShortestPath(shortestPath);
    });
  }

  private cloneGrid(grid: Node[][]): Node[][] {
    const clonedGrid: Node[][] = [];

    for (let y = 0; y < grid.length; y++) {
      const row: Node[] = [];
      for (let x = 0; x < grid[0].length; x++) {
        const node = grid[y][x];
        const clonedNode = Node.create({
          type: node.getType(),
          vector: node.getVector(),
        });
        row.push(clonedNode);
      }
      clonedGrid.push(row);
    }

    return clonedGrid;
  }

  private breadthFirstSearch(
    grid: Node[][],
    startNode: Node,
    endNode: Node
  ): Node[] {
    const visitedNodesInOrder: Node[] = [];
    const queue: Node[] = [];

    queue.push(startNode);

    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (!currentNode || currentNode.isExplored() || currentNode.isWall()) {
        continue;
      }

      if (currentNode.getType() !== NodeType.Start && currentNode !== endNode) {
        currentNode.setExplored();
      }

      visitedNodesInOrder.push(currentNode);

      if (currentNode === endNode) {
        break;
      }

      const unvisitedNeighbors = this.getUnvisitedNeighbors(currentNode, grid);

      for (const neighbor of unvisitedNeighbors) {
        neighbor.setPreviousNode(currentNode);
        queue.push(neighbor);
      }
    }

    return visitedNodesInOrder;
  }

  private getUnvisitedNeighbors(node: Node, grid: Node[][]): Node[] {
    const neighbors: Node[] = [];
    const { x, y } = node.getVector();

    if (y > 0) neighbors.push(grid[y - 1][x]);
    if (y < grid.length - 1) neighbors.push(grid[y + 1][x]);
    if (x > 0) neighbors.push(grid[y][x - 1]);
    if (x < grid[0].length - 1) neighbors.push(grid[y][x + 1]);

    return neighbors.filter((neighbor) => !neighbor.isExplored());
  }

  private animateBreadthFirstSearch(
    visitedNodesInOrder: Node[]
  ): Promise<void> {
    return new Promise((resolve) => {
      for (let i = 0; i < visitedNodesInOrder.length; i++) {
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          if (
            node.getType() !== NodeType.Start &&
            node.getType() !== NodeType.End
          )
            this.gridStore.setNodeAs(node.getVector(), NodeType.Explored);
          if (i === visitedNodesInOrder.length - 1) resolve();
        }, 10 * i);
      }
    });
  }

  private getShortestPath(endNode: Node): Node[] {
    const shortestPath: Node[] = [];
    let currentNode: Node | undefined = endNode;

    while (currentNode && currentNode.getType() !== NodeType.Start) {
      shortestPath.unshift(currentNode);

      currentNode = currentNode.getPreviousNode();
    }

    return shortestPath;
  }

  private animateShortestPath(shortestPath: Node[]): void {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        if (
          node.getType() !== NodeType.Start &&
          node.getType() !== NodeType.End
        )
          this.gridStore.setNodeAs(node.getVector(), NodeType.Path);
      }, 50 * i);
    }
  }
}
