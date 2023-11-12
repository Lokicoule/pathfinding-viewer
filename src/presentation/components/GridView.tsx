import { NodeInteractionCommand } from "../../domain/commands/NodeInteractionCommand";
import { Node } from "../../domain/entities/Node";
import { NODE_PIXEL_SIZE } from "../../shared/constants";
import { useCommand } from "../adapters/mediator/hooks/useCommand";
import { useAlgorithmIsRunning } from "../hooks/useAlgorithmIsRunning";
import { useGrid } from "../hooks/useGrid";
import useStateMap from "../hooks/useStateMap";
import { concat } from "../utils/string";

type GridComponent = React.FC;

const GridView: GridComponent = () => {
  const grid = useGrid();
  const isAlgorithmRunning = useAlgorithmIsRunning();

  const sendCommand = useCommand();
  const nodes = useStateMap<string, Node>();

  const handleNodeClick = (node: Node) => {
    sendCommand(NodeInteractionCommand.name, new NodeInteractionCommand(node));
  };

  const handleMouseDown = (node: Node) => {
    nodes.addEntry(node.id, node);
  };

  const handleMouseEnter = (node: Node) => {
    if (nodes.Map.size > 0 && !nodes.Map.has(node.id)) {
      nodes.addEntry(node.id, node);
    } else if (nodes.Map.size > 0 && nodes.Map.has(node.id)) {
      nodes.deleteEntry(node.id);
    }
  };

  const handleMouseUp = () => {
    Array.from(nodes.Map.values()).forEach((node) => {
      sendCommand(
        NodeInteractionCommand.name,
        new NodeInteractionCommand(node)
      );
    });
    nodes.clearMap();
  };

  const cellState = (node: Node) => {
    if (node.isStart()) {
      return "start";
    } else if (node.isEnd()) {
      return "end";
    } else if (
      (node.isWall() && !nodes.Map.has(node.id)) ||
      (nodes.Map.has(node.id) && !node.isWall())
    ) {
      return concat("wall", node.isEmpty() || node.isWall() ? "bounding" : "");
    } else if (node.isEmpty() || (nodes.Map.has(node.id) && node.isWall())) {
      return concat("empty", "bounding");
    } else if (node.isExplored()) {
      return concat("explored", isAlgorithmRunning ? "exploring" : "");
    } else if (node.isPath()) {
      return concat("path", isAlgorithmRunning ? "pathing" : "");
    }
  };

  return (
    <div className="grid">
      {grid.getNodes().map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((node) => (
            <div
              key={node.id}
              className={concat("cell", cellState(node))}
              style={{
                width: `${NODE_PIXEL_SIZE}px`,
                height: `${NODE_PIXEL_SIZE}px`,
                pointerEvents: isAlgorithmRunning ? "none" : "auto",
                //animationPlayState: isAlgorithmRunning ? "running" : "paused",
              }}
              onClick={() => handleNodeClick(node)}
              onMouseDown={
                !node.isStart() && !node.isEnd()
                  ? () => handleMouseDown(node)
                  : undefined
              }
              onMouseEnter={
                !node.isStart() && !node.isEnd()
                  ? () => handleMouseEnter(node)
                  : undefined
              }
              onMouseUp={() => handleMouseUp()}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridView;
