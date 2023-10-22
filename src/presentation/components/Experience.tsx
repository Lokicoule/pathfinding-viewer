import { ResetGridCommand } from "../../domain/commands/ResetGridCommand";
import { useCommand } from "../../infrastructure/mediator/react/hooks/useCommand";
import GridView from "./GridView";

type EnvironmentComponent = React.FC;

const Environment: EnvironmentComponent = () => {
  const sendResetCommand = useCommand(ResetGridCommand.name);

  return (
    <div>
      <GridView />
      <div>
        <button onClick={() => sendResetCommand(new ResetGridCommand())}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Environment;
