import { AlgorithmRunnerCommand } from "../../domain/commands/AlgorithmRunnerCommand";
import { Node } from "../../domain/entities/Node";
import { AlgorithmRunnerCompletedEvent } from "../../domain/events/AlgorithmRunnerCompletedEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { AlgorithmType } from "../../domain/types/AlgorithmType";
import { BreadthFirstSearchAlgorithm } from "../algorithms/BreadthFirstSearchAlgorithm";
import { DepthFirstSearchAlgorithm } from "../algorithms/DepthFirstSearchAlgorithm";
import { DijkstraAlgorithm } from "../algorithms/DijkstraAlgorithm";
import { Mediator } from "../mediator/Mediator";
import { GridStore } from "../stores/GridStore";

export class AlgorithmRunnerCommandHandler
  implements CommandHandler<AlgorithmRunnerCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(command: AlgorithmRunnerCommand): void {
    const grid = this.cloneGrid(this.gridStore.getGrid());
    const startNode =
      grid[this.gridStore.getStartNode().getVector().y][
        this.gridStore.getStartNode().getVector().x
      ];
    const endNode =
      grid[this.gridStore.getEndNode().getVector().y][
        this.gridStore.getEndNode().getVector().x
      ];

    const algorithm = this.algorithmFactory(command.algorithm);

    const visitedNodesInOrder = algorithm
      .create(grid, startNode, endNode)
      .run();

    this.mediator.sendEvent(
      AlgorithmRunnerCompletedEvent.name,
      new AlgorithmRunnerCompletedEvent(endNode, visitedNodesInOrder)
    );
  }

  private algorithmFactory(algorithmType: AlgorithmType) {
    switch (algorithmType) {
      case "BFS":
        return BreadthFirstSearchAlgorithm;
      case "DFS":
        return DepthFirstSearchAlgorithm;
      case "DIJKSTRA":
        return DijkstraAlgorithm;
      default:
        throw new Error(`${algorithmType} is not a valid algorithm`);
    }
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
}
