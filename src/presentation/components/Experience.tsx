import { PathfindingRunnerCommand } from "../../domain/commands/PathfindingRunnerCommand";
import { MazeRunnerCommand } from "../../domain/commands/MazeRunnerCommand";
import { ResetGridCommand } from "../../domain/commands/ResetGridCommand";
import { useCommand } from "../adapters/mediator/hooks/useCommand";
import GridView from "./GridView";
import { ClearWallsCommand } from "../../domain/commands/ClearWallsCommand";
import { ClearPathAndExploredNodesCommand } from "../../domain/commands/ClearPathAndExploredNodesCommand";

type EnvironmentComponent = React.FC;

const Environment: EnvironmentComponent = () => {
  const sendCommand = useCommand();

  return (
    <div>
      <GridView />
      <div>
        <button
          onClick={() =>
            sendCommand(ResetGridCommand.name, new ResetGridCommand())
          }
        >
          Reset
        </button>
        <button
          onClick={() =>
            sendCommand(ClearWallsCommand.name, new ClearWallsCommand())
          }
        >
          Clear Walls
        </button>
        <button
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
          onClick={() => {
            sendCommand(MazeRunnerCommand.name, new MazeRunnerCommand("PRIMS"));
          }}
        >
          Generate Maze (Prims)
        </button>
        <button
          onClick={() => {
            sendCommand(MazeRunnerCommand.name, new MazeRunnerCommand("DFS"));
          }}
        >
          Generate Maze (Backtracking)
        </button>
      </div>
    </div>
  );
};

export default Environment;
