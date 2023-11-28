import {
  PathfindingAlgorithmType,
  PathfindingRunnerCommand,
  PathfindingRunnerCompletedEvent,
} from "@domain/pathfinding";
import { Mediator } from "@infra/mediator";
import { GridStore } from "@infra/stores";
import { CommandHandlerContract } from "@/infrastructure/cqrs/command/contracts/CommandHandlerContract";

export class PathfindingRunnerCommandHandler
  implements CommandHandlerContract<PathfindingRunnerCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  async execute(command: PathfindingRunnerCommand) {
    try {
      console.log("Running pathfinding algorithm");
      const algorithm = await this.algorithmFactory(command.algorithm);

      const grid = this.gridStore
        .getGrid()
        .copy()
        .clear("Path", "Explored", "Highlighted");

      const startNode = grid.getNode(
        this.gridStore.getStartNode().getVector().x,
        this.gridStore.getStartNode().getVector().y
      );
      const endNode = grid.getNode(
        this.gridStore.getEndNode().getVector().x,
        this.gridStore.getEndNode().getVector().y
      );

      this.gridStore.setGrid(grid.copy());

      const path = algorithm.create(grid, startNode, endNode).run();

      this.mediator.sendEvent(
        new PathfindingRunnerCompletedEvent(endNode, path)
      );
    } catch (e) {
      console.log(e);
    }
  }

  private async algorithmFactory(algorithmType: PathfindingAlgorithmType) {
    switch (algorithmType) {
      case "PATHFINDING_BFS":
        return import(
          "../algorithms/BreadthFirstSearchPathfindingAlgorithm"
        ).then((module) => module.BreadthFirstSearchPathfindingAlgorithm);
      case "PATHFINDING_DFS":
        return import(
          "../algorithms/DepthFirstSearchPathfindingAlgorithm"
        ).then((module) => module.DepthFirstSearchPathfindingAlgorithm);
      case "PATHFINDING_DIJKSTRA":
        return import("../algorithms/DijkstraPathfindingAlgorithm").then(
          (module) => module.DijkstraPathfindingAlgorithm
        );
      case "PATHFINDING_A_STAR":
        return import("../algorithms/AStarPathfindingAlgorithm").then(
          (module) => module.AStarPathfindingAlgorithm
        );
      default:
        throw new Error(`${algorithmType} is not a valid algorithm`);
    }
  }
}
