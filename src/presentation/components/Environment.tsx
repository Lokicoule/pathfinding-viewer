import "./Environment.css";
import { useCommand } from "../../infrastructure/mediator/react/hooks/useCommand";
import { InitializeGridCommand } from "../../domain/commands/InitializeGridCommand";

type EnvironmentComponent = React.FC;

const Environment: EnvironmentComponent = () => {
  const sendCommand = useCommand(InitializeGridCommand.name);

  return (
    <div>
      {/* <GridView nodeSize={30} nodes={grid.getNodes()} /> */}
      <div>
        <button
          onClick={() => {
            sendCommand(new InitializeGridCommand(10, 10));
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Environment;
