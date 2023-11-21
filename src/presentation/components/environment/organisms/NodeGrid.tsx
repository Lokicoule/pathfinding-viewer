import { NODE_PIXEL_SIZE } from "@/shared/constants";
import { Node } from "@domain/entities/Node";
import { useCommand } from "../../../adapters/mediator/hooks";
import { useAlgorithm } from "../../../hooks/useAlgorithm";
import { useGrid } from "../../../hooks/useGrid";

import { useState } from "react";

import "./NodeGrid.css";
import { AddWallsCommand } from "@/domain/commands/grid/AddWallsCommand";
import { RemoveWallsCommand } from "@/domain/commands/grid/RemoveWallsCommand";
import { SwapStartAndEndNodesCommand } from "@/domain/commands/grid/SwapStartAndEndNodesCommand";
import { SetStartNodeCommand } from "@/domain/commands/grid/SetStartNodeCommand";
import { SetEndNodeCommand } from "@/domain/commands/grid/SetEndNodeCommand";

type NodeGridComponent = React.FC;

const factory = (
  node: Node,
  optimistic: boolean,
  animate: boolean,
  isOptimisticStart: boolean,
  isOptimisticEnd: boolean
) => {
  if (optimistic) {
    if (node.isNotType("Wall")) {
      return "wall";
    } else {
      return "empty";
    }
  } else if (node.isOneOf("Start", "Highlighted") || isOptimisticStart) {
    return "start";
  } else if (node.isType("End") || isOptimisticEnd) {
    return "end";
  } else if (node.isType("Empty")) {
    return `empty ${animate ? "bounding" : ""}`;
  } else if (node.isType("Explored")) {
    return `explored ${animate ? "exploring" : ""}`;
  } else if (node.isType("Path")) {
    return `path ${animate ? "pathing" : ""}`;
  } else if (node.isType("Wall")) {
    return `wall ${animate ? "bounding" : ""}`;
  } else {
    return "";
  }
};

const NodeGrid: NodeGridComponent = () => {
  const grid = useGrid();
  const { isAlgorithmRunning } = useAlgorithm();
  const [startNode, setStartNode] = useState<Node | null>(null);
  const [endNode, setEndNode] = useState<Node | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [targetNode, setTargetNode] = useState<Node | null>(null);
  const [batchedNodesMap, setBatchedNodesMap] = useState(
    new Map<string, Node>()
  );

  const sendCommand = useCommand();

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
    setIsDragging(true);
    toggleNodeInBatch(node);
  };

  const handleMouseEnter = (node: Node) => {
    if (isDragging && node.isNotType("Start", "End")) {
      toggleNodeInBatch(node);
    }
    if (targetNode) {
      setTargetNode(node);
    }
  };

  const handleMouseUp = (node: Node) => {
    let clickedNode = null;
    setIsDragging(false);

    if (node.isType("Start")) {
      clickedNode = node;
      setStartNode(node);
      setTargetNode(node);
    } else if (node.isType("End")) {
      clickedNode = node;
      setEndNode(node);
      setTargetNode(node);
    } else {
      if (startNode) {
        sendCommand(new SetStartNodeCommand(startNode, node));
      } else if (endNode) {
        sendCommand(new SetEndNodeCommand(endNode, node));
      } else {
        const optimisticWalls = Array.from(batchedNodesMap.values()).filter(
          (node) => node.isNotType("Wall")
        );
        const optimisticEmpty = Array.from(batchedNodesMap.values()).filter(
          (node) => node.isNotType("Empty")
        );

        if (optimisticWalls.length > 0) {
          sendCommand(new AddWallsCommand(optimisticWalls));
        }
        if (optimisticEmpty.length > 0) {
          sendCommand(new RemoveWallsCommand(optimisticEmpty));
        }
      }
      setStartNode(null);
      setEndNode(null);
      setTargetNode(null);
    }

    if (startNode && clickedNode?.isType("End")) {
      sendCommand(new SwapStartAndEndNodesCommand(startNode, clickedNode));
      setStartNode(null);
      setEndNode(null);
      setTargetNode(null);
    } else if (endNode && clickedNode?.isType("Start")) {
      sendCommand(new SwapStartAndEndNodesCommand(clickedNode, endNode));
      setStartNode(null);
      setEndNode(null);
      setTargetNode(null);
    }

    setBatchedNodesMap(new Map());
  };

  return (
    <div className="my-4">
      {grid.nodes.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((node) => (
            <div
              key={node.id}
              className={`cursor-cell cell ${factory(
                node,
                batchedNodesMap.has(node.id),
                isAlgorithmRunning,
                !!startNode && !!targetNode?.equals(node),
                !!endNode && !!targetNode?.equals(node)
              )}
              ${startNode || endNode ? "cursor-move opacity-70" : ""}
              ${
                startNode?.equals(node) || endNode?.equals(node)
                  ? "brightness-75"
                  : ""
              }
              ${isAlgorithmRunning ? "pointer-events-none" : ""}
              `}
              style={{
                width: `${NODE_PIXEL_SIZE}px`,
                height: `${NODE_PIXEL_SIZE}px`,
              }}
              onMouseDown={() => handleMouseDown(node)}
              onMouseEnter={() => handleMouseEnter(node)}
              onMouseUp={() => handleMouseUp(node)}
              onBlur={() => handleMouseUp(node)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default NodeGrid;
