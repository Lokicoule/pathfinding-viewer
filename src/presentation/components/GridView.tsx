import { NodeInteractionCommand } from "../../domain/commands/NodeInteractionCommand";
import { Node } from "../../domain/entities/Node";
import { useCommand } from "../adapters/mediator/hooks/useCommand";
import { useGridStore } from "../../infrastructure/stores/react/hooks/useGridStore";
import { NODE_PIXEL_SIZE } from "../../shared/constants";
import { concatClassNames } from "../utils/concatClassNames";

type GridComponent = React.FC;

const GridView: GridComponent = () => {
  const grid = useGridStore();

  const sendCommand = useCommand();

  const handleNodeClick = (node: Node) => {
    sendCommand(NodeInteractionCommand.name, new NodeInteractionCommand(node));
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((node) => (
            <div
              key={node.id}
              className={concatClassNames(
                "cell",
                node.isStart() ? "start" : undefined,
                node.isEnd() ? "end" : undefined,
                node.isWall() ? "wall" : undefined
              )}
              style={{
                width: `${NODE_PIXEL_SIZE}px`,
                height: `${NODE_PIXEL_SIZE}px`,
              }}
              onClick={() => handleNodeClick(node)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridView;
