import { NodeInteractionCommand } from "../../domain/commands/NodeInteractionCommand";
import { Node } from "../../domain/entities/Node";
import { NODE_PIXEL_SIZE } from "../../shared/constants";
import { useCommand } from "../adapters/mediator/hooks/useCommand";
import { useAlgorithm } from "../hooks/useAlgorithm";
import { useGrid } from "../hooks/useGrid";
import useStateMap from "../hooks/useStateMap";
import { concat } from "../utils/string";
import Algorithm from "./Algorithm";
import Controls from "./Controls";
import { Legend } from "./Legend";
import Maze from "./Maze";
import Pathfinding from "./Pathfinding";
import SpeedControl from "./SpeedControl";
import Card from "./card/Card";

type GridCardComponent = React.FC;

const GridCard: GridCardComponent = () => {
  const grid = useGrid();
  const { isAlgorithmRunning } = useAlgorithm();

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
    if (node.isStart() || node.isHighlighted()) {
      return "start";
    } else if (node.isEnd()) {
      return "end";
    } else if (
      (node.isWall() && !nodes.Map.has(node.id)) ||
      (nodes.Map.has(node.id) && !node.isWall())
    ) {
      return concat("wall", isAlgorithmRunning ? "bounding" : "");
    } else if (node.isEmpty() || (nodes.Map.has(node.id) && node.isWall())) {
      return concat("empty", isAlgorithmRunning ? "bounding" : "");
    } else if (node.isExplored()) {
      return concat("explored", isAlgorithmRunning ? "exploring" : "");
    } else if (node.isPath()) {
      return concat("path", isAlgorithmRunning ? "pathing" : "");
    }
  };

  return (
    <Card isBlurred className="border-none h-full w-full">
      <Card.Header>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center space-x-10">
              <Maze />
              <Pathfinding />
            </div>
          </div>
          <Controls />
        </div>
      </Card.Header>
      <Card.Body>
        <div className="flex justify-between items-center">
          <SpeedControl />
          <Legend />
        </div>
        <div className="mt-4">
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
                  onBlur={() => handleMouseUp()}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </Card.Body>
      <Card.Footer>
        <Algorithm />
      </Card.Footer>
    </Card>
  );
};

export default GridCard;
