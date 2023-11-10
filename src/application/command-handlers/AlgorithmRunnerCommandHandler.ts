import { AlgorithmRunnerCommand } from "../../domain/commands/AlgorithmRunnerCommand";
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
    const grid = this.gridStore.getGrid().copy();

    const startNode = grid.getNode(
      this.gridStore.getStartNode().getVector().x,
      this.gridStore.getStartNode().getVector().y
    );
    const endNode = grid.getNode(
      this.gridStore.getEndNode().getVector().x,
      this.gridStore.getEndNode().getVector().y
    );
    console.log("startNode", startNode);
    console.log("endNode", endNode);
    console.log("grid", grid);

    const algorithm = this.algorithmFactory(command.algorithm);

    const visitedNodesInOrder = algorithm.create(grid, startNode).run();

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
}
