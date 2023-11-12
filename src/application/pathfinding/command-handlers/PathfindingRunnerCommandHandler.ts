import { PathfindingRunnerCommand } from "../../../domain/commands/PathfindingRunnerCommand";
import { PathfindingRunnerCompletedEvent } from "../../../domain/events/PathfindingRunnerCompletedEvent";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { PathfindingAlgorithmType } from "../../../domain/types/PathfindingAlgorithmType";
import { BreadthFirstSearchAlgorithm } from "../algorithms/BreadthFirstSearchAlgorithm";
import { DepthFirstSearchAlgorithm } from "../algorithms/DepthFirstSearchAlgorithm";
import { DijkstraAlgorithm } from "../algorithms/DijkstraAlgorithm";
import { Mediator } from "../../../infrastructure/mediator/Mediator";
import { GridStore } from "../../../infrastructure/stores/GridStore";
import { NodeType } from "../../../domain/enums/NodeType";
import { AStarAlgorithm } from "../algorithms/AStarAlgorithm";

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
        return BreadthFirstSearchAlgorithm;
      case "DFS":
        return DepthFirstSearchAlgorithm;
      case "DIJKSTRA":
        return DijkstraAlgorithm;
      case "A_STAR":
        return AStarAlgorithm;
      default:
        throw new Error(`${algorithmType} is not a valid algorithm`);
    }
  }
}
