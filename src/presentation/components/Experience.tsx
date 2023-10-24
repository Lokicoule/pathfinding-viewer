import { ResetGridCommand } from "../../domain/commands/ResetGridCommand";
import { useCommand } from "../hooks/mediator/useCommand";
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
