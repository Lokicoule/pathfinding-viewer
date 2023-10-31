import { DepthFirstSearchCommand } from "../../domain/commands/DepthFirstSearchCommand";
import { Node } from "../../domain/entities/Node";
import { NodeType } from "../../domain/enums/NodeType";
import { BreadthFirstSearchCompletedEvent } from "../../domain/events/BreadthFirstSearchCompletedEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { DepthFirstSearchAlgorithm } from "../algorithms/DepthFirstSearchAlgorithm";
import { Mediator } from "../mediator/Mediator";
import { GridStore } from "../stores/GridStore";

export class DepthFirstSearchCommandHandler
  implements CommandHandler<DepthFirstSearchCommand>
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

    const algorithm = DepthFirstSearchAlgorithm.create(
      grid,
      startNode,
      endNode
    );
    const visitedNodesInOrder = algorithm.run();

    this.animateBreadthFirstSearch(visitedNodesInOrder).then(() => {
      this.mediator.sendEvent(
        BreadthFirstSearchCompletedEvent.name,
        new BreadthFirstSearchCompletedEvent(endNode)
      );
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
}
