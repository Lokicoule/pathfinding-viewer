import { NODE_PIXEL_SIZE } from "@/shared/constants";
import { NodeInteractionCommand } from "@domain/commands/NodeInteractionCommand";
import { Node } from "@domain/entities/Node";
import { useCommand } from "../../../adapters/mediator/hooks";
import { useAlgorithm } from "../../../hooks/useAlgorithm";
import { useGrid } from "../../../hooks/useGrid";

import { useState } from "react";
import "../molecules/NodeCell.css";

type NodeGridComponent = React.FC;

const NodeGrid: NodeGridComponent = () => {
  const grid = useGrid();
  const { isAlgorithmRunning } = useAlgorithm();
  const [isPressed, setIsPressed] = useState(false);
  const [batchedNodesMap, setBatchedNodesMap] = useState(
    new Map<string, Node>()
  );

  const sendCommand = useCommand();

  const handleNodeClick = (node: Node) => {
    sendCommand(new NodeInteractionCommand(node));
  };

  const toggleNodeInBatch = (node: Node) => {
    setBatchedNodesMap((prevMap) => {
      const updatedMap = new Map(prevMap);

      if (!updatedMap.has(node.id)) {
        updatedMap.set(node.id, node);
      } else {
        updatedMap.delete(node.id);
      }

      return updatedMap;
    });
  };

  const handleMouseDown = (node: Node) => {
    setIsPressed(true);
    toggleNodeInBatch(node);
  };

  const handleMouseEnter = (node: Node) => {
    if (isPressed) {
      toggleNodeInBatch(node);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    batchedNodesMap.forEach((batchedNode) => handleNodeClick(batchedNode));
    setBatchedNodesMap(new Map());
  };

  const cellState = (node: Node) => {
    const isNodeInBatch = batchedNodesMap.has(node.id);

    if (isNodeInBatch) {
      if (node.isEmpty()) {
        return "wall";
      } else if (node.isWall()) {
        return "empty";
      }
    } else if (node.isStart() || node.isHighlighted()) {
      return "start";
    } else if (node.isEnd()) {
      return "end";
    } else if (node.isEmpty()) {
      return `empty ${isAlgorithmRunning ? "bounding" : ""}`;
    } else if (node.isExplored()) {
      return `explored ${isAlgorithmRunning ? "exploring" : ""}`;
    } else if (node.isPath()) {
      return `path ${isAlgorithmRunning ? "pathing" : ""}`;
    } else if (node.isWall()) {
      return `wall ${isAlgorithmRunning ? "bounding" : ""}`;
    } else {
      return "";
    }
  };

  return (
    <div className="my-4">
      {grid.nodes.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((node) => (
            <div
              key={node.id}
              className={`cell ${cellState(node)} 
                ${!isAlgorithmRunning ? "cursor-cell" : "pointer-events-none"}`}
              style={{
                width: `${NODE_PIXEL_SIZE}px`,
                height: `${NODE_PIXEL_SIZE}px`,
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
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default NodeGrid;
