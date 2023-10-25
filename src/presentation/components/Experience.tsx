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
      </div>
    </div>
  );
};

export default Environment;
