import { PathfindingRunnerCommand } from "../../domain/commands/PathfindingRunnerCommand";
import { MazeRunnerCommand } from "../../domain/commands/MazeRunnerCommand";
import { ResetGridCommand } from "../../domain/commands/ResetGridCommand";
import { useCommand } from "../adapters/mediator/hooks/useCommand";
import GridView from "./GridView";
import { ClearWallsCommand } from "../../domain/commands/ClearWallsCommand";
import { ClearPathAndExploredNodesCommand } from "../../domain/commands/ClearPathAndExploredNodesCommand";
import { useAlgorithmIsRunning } from "../hooks/useAlgorithmIsRunning";
import { StopAlgorithmCommand } from "../../domain/commands/StopAlgorithmCommand";

type EnvironmentComponent = React.FC;

const Environment: EnvironmentComponent = () => {
  const sendCommand = useCommand();
  const isAlgorithmRunning = useAlgorithmIsRunning();

  return (
    <div>
      <GridView />
      <div>
        <button
          disabled={isAlgorithmRunning}
          onClick={() =>
            sendCommand(ResetGridCommand.name, new ResetGridCommand())
          }
        >
          Reset
        </button>
        <button
          disabled={isAlgorithmRunning}
          onClick={() =>
            sendCommand(ClearWallsCommand.name, new ClearWallsCommand())
          }
        >
          Clear Walls
        </button>
        <button
          disabled={isAlgorithmRunning}
          onClick={() =>
            sendCommand(
              ClearPathAndExploredNodesCommand.name,
              new ClearPathAndExploredNodesCommand()
            )
          }
        >
          Clear Path and Explored Nodes
        </button>
        <button
          disabled={isAlgorithmRunning}
          onClick={() =>
            sendCommand(
              PathfindingRunnerCommand.name,
              new PathfindingRunnerCommand("BFS")
            )
          }
        >
          Start BFS
        </button>
        <button
          disabled={isAlgorithmRunning}
          onClick={() =>
            sendCommand(
              PathfindingRunnerCommand.name,
              new PathfindingRunnerCommand("DFS")
            )
          }
        >
          Start DFS
        </button>
        <button
          disabled={isAlgorithmRunning}
          onClick={() =>
            sendCommand(
              PathfindingRunnerCommand.name,
              new PathfindingRunnerCommand("DIJKSTRA")
            )
          }
        >
          Start Djikstra
        </button>

        <button
          disabled={isAlgorithmRunning}
          onClick={() => {
            sendCommand(
              MazeRunnerCommand.name,
              new MazeRunnerCommand("RECURSIVE_DIVISION")
            );
          }}
        >
          Generate Maze (Recursive Division)
        </button>
        <button
          disabled={isAlgorithmRunning}
          onClick={() => {
            sendCommand(MazeRunnerCommand.name, new MazeRunnerCommand("PRIMS"));
          }}
        >
          Generate Maze (Prims)
        </button>
        <button
          disabled={isAlgorithmRunning}
          onClick={() => {
            sendCommand(MazeRunnerCommand.name, new MazeRunnerCommand("DFS"));
          }}
        >
          Generate Maze (Backtracking)
        </button>
        <button
          disabled={!isAlgorithmRunning}
          onClick={() => {
            sendCommand(StopAlgorithmCommand.name, new StopAlgorithmCommand());
          }}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default Environment;
