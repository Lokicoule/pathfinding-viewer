import { AlgorithmRunnerCommand } from "../../domain/commands/AlgorithmRunnerCommand";
import { MazeGenerationRunnerCommand } from "../../domain/commands/MazeGenerationRunnerCommand";
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
              AlgorithmRunnerCommand.name,
              new AlgorithmRunnerCommand("BFS")
            )
          }
        >
          Start BFS
        </button>
        <button
          onClick={() =>
            sendCommand(
              AlgorithmRunnerCommand.name,
              new AlgorithmRunnerCommand("DFS")
            )
          }
        >
          Start DFS
        </button>
        <button
          onClick={() =>
            sendCommand(
              AlgorithmRunnerCommand.name,
              new AlgorithmRunnerCommand("DIJKSTRA")
            )
          }
        >
          Start Djikstra
        </button>

        <button
          onClick={() => {
            sendCommand(
              MazeGenerationRunnerCommand.name,
              new MazeGenerationRunnerCommand("RECURSIVE_DIVISION")
            );
          }}
        >
          Generate Maze (Recursive Division)
        </button>
        <button
          onClick={() => {
            sendCommand(
              MazeGenerationRunnerCommand.name,
              new MazeGenerationRunnerCommand("PRIMS")
            );
          }}
        >
          Generate Maze (Prims)
        </button>
      </div>
    </div>
  );
};

export default Environment;
