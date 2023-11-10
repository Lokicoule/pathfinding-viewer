import { MazeGenerationRunnerCommand } from "../../domain/commands/MazeGenerationRunnerCommand";
import { Node } from "../../domain/entities/Node";
import { MazeAlgorithmRunnerCompletedEvent } from "../../domain/events/MazeAlgorithmRunnerCompletedEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { MazeAlgorithmType } from "../../domain/types/AlgorithmType";
import { Mediator } from "../mediator/Mediator";
import { GridStore } from "../stores/GridStore";

export class MazeGenerationRunnerCommandHandler
  implements CommandHandler<MazeGenerationRunnerCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(command: MazeGenerationRunnerCommand): void {
    const grid = this.cloneGrid(this.gridStore.getGrid());
    const startNode =
      grid[this.gridStore.getStartNode().getVector().y][
        this.gridStore.getStartNode().getVector().x
      ];

    const algorithm = this.algorithmFactory(command.algorithm);

    const walls = algorithm.then((module) =>
      module.create(grid, startNode).run()
    );

    walls.then((walls) => {
      this.mediator.sendEvent(
        MazeAlgorithmRunnerCompletedEvent.name,
        new MazeAlgorithmRunnerCompletedEvent(walls)
      );
    });
  }

  private async algorithmFactory(algorithmType: MazeAlgorithmType) {
    switch (algorithmType) {
      case "PRIMS":
        return import("../algorithms/maze/PrimsAlgorithm").then(
          (module) => module.PrimsAlgorithm
        );
      case "RECURSIVE_DIVISION":
        return import("../algorithms/maze/RecursiveDivisionAlgorithm").then(
          (module) => module.RecursiveDivisionAlgorithm
        );
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
