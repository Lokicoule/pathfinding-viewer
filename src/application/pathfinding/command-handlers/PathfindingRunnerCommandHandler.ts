import { PathfindingRunnerCommand } from "../../../domain/commands/PathfindingRunnerCommand";
import { NodeType } from "../../../domain/enums/NodeType";
import { PathfindingRunnerCompletedEvent } from "../../../domain/events/PathfindingRunnerCompletedEvent";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { PathfindingAlgorithmType } from "../../../domain/types/PathfindingAlgorithmType";
import { Mediator } from "../../../infrastructure/mediator/Mediator";
import { GridStore } from "../../../infrastructure/stores/GridStore";
import { AStarPathfindingAlgorithm } from "../algorithms/AStarPathfindingAlgorithm";
import { BreadthFirstSearchPathfindingAlgorithm } from "../algorithms/BreadthFirstSearchPathfindingAlgorithm";
import { DepthFirstSearchPathfindingAlgorithm } from "../algorithms/DepthFirstSearchPathfindingAlgorithm";
import { DijkstraPathfindingAlgorithm } from "../algorithms/DijkstraPathfindingAlgorithm";

export class PathfindingRunnerCommandHandler
  implements CommandHandler<PathfindingRunnerCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  execute(command: PathfindingRunnerCommand): void {
    const grid = this.gridStore
      .getGrid()
      .clear(NodeType.Path, NodeType.Explored)
      .copy();

    const startNode = grid.getNode(
      this.gridStore.getStartNode().getVector().x,
      this.gridStore.getStartNode().getVector().y
    );
    const endNode = grid.getNode(
      this.gridStore.getEndNode().getVector().x,
      this.gridStore.getEndNode().getVector().y
    );

    const algorithm = this.algorithmFactory(command.algorithm);

    const path = algorithm.create(grid, startNode, endNode).run();

    this.mediator.sendEvent(
      PathfindingRunnerCompletedEvent.name,
      new PathfindingRunnerCompletedEvent(endNode, path)
    );
  }

  private algorithmFactory(algorithmType: PathfindingAlgorithmType) {
    switch (algorithmType) {
      case "BFS":
        return BreadthFirstSearchPathfindingAlgorithm;
      case "DFS":
        return DepthFirstSearchPathfindingAlgorithm;
      case "DIJKSTRA":
        return DijkstraPathfindingAlgorithm;
      case "A_STAR":
        return AStarPathfindingAlgorithm;
      default:
        throw new Error(`${algorithmType} is not a valid algorithm`);
    }
  }
}
