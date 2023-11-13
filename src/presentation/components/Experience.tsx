/* 
import { ClearPathAndExploredNodesCommand } from "../../domain/commands/ClearPathAndExploredNodesCommand";
import { ClearWallsCommand } from "../../domain/commands/ClearWallsCommand";
import { PathfindingRunnerCommand } from "../../domain/commands/PathfindingRunnerCommand";
import { ResetGridCommand } from "../../domain/commands/ResetGridCommand";
import { StopAlgorithmCommand } from "../../domain/commands/StopAlgorithmCommand";

import {
  PATHFINDING_ALGORITHMS,
  mapStringToPathfindingAlgorithm,
} from "../../domain/types/PathfindingAlgorithmType";
import { useCommand } from "../adapters/mediator/hooks/useCommand";
import { useAlgorithmIsRunning } from "../hooks/useAlgorithmIsRunning";

type EnvironmentComponent = React.FC;

const Actions: EnvironmentComponent = () => {
  const sendCommand = useCommand();
  const isAlgorithmRunning = useAlgorithmIsRunning();

  const resetActionMediator = (action: string) => {
    switch (action) {
      case "RESET_GRID":
        sendCommand(ResetGridCommand.name, new ResetGridCommand());
        break;
      case "CLEAR_WALLS":
        sendCommand(ClearWallsCommand.name, new ClearWallsCommand());
        break;
      case "CLEAR_PATH_AND_EXPLORED_NODES":
        sendCommand(
          ClearPathAndExploredNodesCommand.name,
          new ClearPathAndExploredNodesCommand()
        );
        break;
    }
  };

  const pathfindingAlgorithmMediator = (algorithm: string) => {
    sendCommand(
      PathfindingRunnerCommand.name,
      new PathfindingRunnerCommand(mapStringToPathfindingAlgorithm(algorithm))
    );
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    mediator: (algorithm: string) => void
  ) => {
    const action = event.target.value;
    mediator(action);
  };

  return (
    <div
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
    >
      <CardHeader>
        <h2 className="font-bold text-2xl">Actions</h2>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-4">
          <Select
            disabled={isAlgorithmRunning}
            placeholder="Select Reset Action"
            label="Select Reset Action"
            onChange={(event) => handleSelectChange(event, resetActionMediator)}
          >
            <SelectItem key="t" value="RESET_GRID">
              Reset Grid
            </SelectItem>
            <SelectItem key="ts" value="CLEAR_WALLS">
              Clear Walls
            </SelectItem>
            <SelectItem key="td" value="CLEAR_PATH_AND_EXPLORED_NODES">
              Clear Path and Explored Nodes
            </SelectItem>
          </Select>

          <Select
            disabled={isAlgorithmRunning}
            placeholder="Run Pathfinding Algorithm"
            onChange={(event) =>
              handleSelectChange(event, pathfindingAlgorithmMediator)
            }
          >
            {PATHFINDING_ALGORITHMS.map((algorithm) => (
              <SelectItem key={algorithm} value={algorithm}>
                Start {algorithm}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <Button
            disabled={!isAlgorithmRunning}
            onClick={() =>
              sendCommand(StopAlgorithmCommand.name, new StopAlgorithmCommand())
            }
          >
            Stop
          </Button>
        </div>
      </CardBody>
    </div>
  );
};

export default Actions;
 */
