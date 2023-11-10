import { MazeGenerationRunnerCommand } from "../../domain/commands/MazeGenerationRunnerCommand";
import { NodeType } from "../../domain/enums/NodeType";
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

  async execute(command: MazeGenerationRunnerCommand): Promise<void> {
    const algorithm = await this.algorithmFactory(command.algorithm);
    const initState = this.nodeTypeFactory(command.algorithm);

    const grid = this.gridStore
      .getGrid()
      .copy()
      .initialize(
        initState,
        this.gridStore.getStartNode().getVector(),
        this.gridStore.getEndNode().getVector()
      );

    const startNode = grid.getNode(
      this.gridStore.getStartNode().getVector().x,
      this.gridStore.getStartNode().getVector().y
    );

    this.gridStore.setGrid(grid.copy());

    const walls = algorithm.create(grid.getNodes(), startNode).run();

    this.mediator.sendEvent(
      MazeAlgorithmRunnerCompletedEvent.name,
      new MazeAlgorithmRunnerCompletedEvent(walls)
    );
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

  private nodeTypeFactory(algorithm: MazeAlgorithmType): NodeType {
    switch (algorithm) {
      case "PRIMS":
        return NodeType.Wall;
      case "RECURSIVE_DIVISION":
        return NodeType.Empty;
      default:
        throw new Error(`${algorithm} is not a valid algorithm`);
    }
  }
}
