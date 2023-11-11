import { MazeRunnerCommand } from "../../../domain/commands/MazeRunnerCommand";
import { NodeType } from "../../../domain/enums/NodeType";
import { MazeRunnerCompletedEvent } from "../../../domain/events/MazeRunnerCompletedEvent";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { MazeAlgorithmType } from "../../../domain/types/PathfindingAlgorithmType";
import { Mediator } from "../../../infrastructure/mediator/Mediator";
import { GridStore } from "../../../infrastructure/stores/GridStore";

export class MazeRunnerCommandHandler
  implements CommandHandler<MazeRunnerCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  async execute(command: MazeRunnerCommand): Promise<void> {
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

    const startNode = this.gridStore.getStartNode().copy();
    const endNode = this.gridStore.getEndNode().copy();

    this.gridStore.setGrid(grid.copy());

    const walls = algorithm.create(grid.getNodes(), startNode, endNode).run();

    this.mediator.sendEvent(
      MazeRunnerCompletedEvent.name,
      new MazeRunnerCompletedEvent(walls)
    );
  }

  private async algorithmFactory(algorithmType: MazeAlgorithmType) {
    switch (algorithmType) {
      case "PRIMS":
        return import("../algorithms/PrimsMazeAlgorithm").then(
          (module) => module.PrimsMazeAlgorithm
        );
      case "RECURSIVE_DIVISION":
        return import("../algorithms/RecursiveDivisionMazeAlgorithm").then(
          (module) => module.RecursiveDivisionMazeAlgorithm
        );
      case "DFS":
        return import("../algorithms/DepthFirstSearchMazeAlgorithm").then(
          (module) => module.DepthFirstSearchMazeAlgorithm
        );
      default:
        throw new Error(`${algorithmType} is not a valid algorithm`);
    }
  }

  private nodeTypeFactory(algorithm: MazeAlgorithmType): NodeType {
    switch (algorithm) {
      case "DFS":
      case "PRIMS":
        return NodeType.Wall;
      case "RECURSIVE_DIVISION":
        return NodeType.Empty;
      default:
        throw new Error(`${algorithm} is not a valid algorithm`);
    }
  }
}