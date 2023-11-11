import { PathfindingRunnerCommand } from "../../domain/commands/PathfindingRunnerCommand";
import { MazeRunnerCommand } from "../../domain/commands/MazeRunnerCommand";
import { ResetGridCommand } from "../../domain/commands/ResetGridCommand";
import { useCommand } from "../adapters/mediator/hooks/useCommand";
import GridView from "./GridView";

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
