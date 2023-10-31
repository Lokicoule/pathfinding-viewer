import { BreadthFirstSearchCommand } from "../../domain/commands/BreadthFirstSearchCommand";
import { DepthFirstSearchCommand } from "../../domain/commands/DepthFirstSearchCommand";
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
              BreadthFirstSearchCommand.name,
              new BreadthFirstSearchCommand()
            )
          }
        >
          Start BFS
        </button>
        <button
          onClick={() =>
            sendCommand(
              DepthFirstSearchCommand.name,
              new DepthFirstSearchCommand()
            )
          }
        >
          Start DFS
        </button>
      </div>
    </div>
  );
};

export default Environment;
