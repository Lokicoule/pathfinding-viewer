import { InitializeGridCommand } from "../../domain/commands/InitializeGridCommand";
import { useCommand } from "../../infrastructure/mediator/react/hooks/useCommand";
import GridView from "./GridView";

type EnvironmentComponent = React.FC;

const Environment: EnvironmentComponent = () => {
  const sendCommand = useCommand(InitializeGridCommand.name);

  return (
    <div>
      <GridView />
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
