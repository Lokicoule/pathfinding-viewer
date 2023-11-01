import { AlgorithmRunnerCommand } from "../../domain/commands/AlgorithmRunnerCommand";
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
      </div>
    </div>
  );
};

export default Environment;
