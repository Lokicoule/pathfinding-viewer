import { useState } from "react";

import { AddWallsCommand } from "@/domain/commands/grid/AddWallsCommand";
import { RemoveWallsCommand } from "@/domain/commands/grid/RemoveWallsCommand";
import { SetEndNodeCommand } from "@/domain/commands/grid/SetEndNodeCommand";
import { SetStartNodeCommand } from "@/domain/commands/grid/SetStartNodeCommand";
import { SwapStartAndEndNodesCommand } from "@/domain/commands/grid/SwapStartAndEndNodesCommand";
import { generateNodeClasses } from "@/presentation/helpers/nodeClasses";
import { NODE_PIXEL_SIZE } from "@/shared/constants";
import { Node } from "@domain/entities/Node";
import { useCommand } from "../../../adapters/mediator/hooks";
import { useAlgorithm } from "../../../hooks/useAlgorithm";
import { useGrid } from "../../../hooks/useGrid";

import "./NodeGrid.css";

type NodeGridComponent = React.FC;

const NodeGrid: NodeGridComponent = () => {
  const grid = useGrid();
  const { isAlgorithmRunning } = useAlgorithm();
  const [startNode, setStartNode] = useState<Node | null>(null);
  const [endNode, setEndNode] = useState<Node | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [targetNode, setTargetNode] = useState<Node | null>(null);
  const [batchedNodesMap, setBatchedNodesMap] = useState<Map<string, Node>>(
    new Map()
  );

  const sendCommand = useCommand();

  const toggleNodeInBatch = (node: Node) => {
    if (node.isNotType("Start", "End")) {
      setBatchedNodesMap((prevMap) => {
        const updatedMap = new Map(prevMap);
        updatedMap.has(node.id)
          ? updatedMap.delete(node.id)
          : updatedMap.set(node.id, node);
        return updatedMap;
      });
    }
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
    setIsDragging(false);
    const clickedNode = node.isOneOf("Start", "End") ? node : null;

    if (clickedNode) {
      handleClickedNode(clickedNode);
    } else {
      handleNonClickedNode(node);
    }

    if (startNode && clickedNode?.isType("End")) {
      swapNodes(startNode, clickedNode);
    } else if (endNode && clickedNode?.isType("Start")) {
      swapNodes(clickedNode, endNode);
    }

    setBatchedNodesMap(new Map());
  };

  const handleClickedNode = (node: Node) => {
    if (node.isType("Start")) {
      setStartNode(node);
    } else {
      setEndNode(node);
    }
    setTargetNode(node);
  };

  const handleNonClickedNode = (node: Node) => {
    if (startNode) {
      sendCommand(new SetStartNodeCommand(startNode, node));
    } else if (endNode) {
      sendCommand(new SetEndNodeCommand(endNode, node));
    } else {
      handleBatchedNodes();
    }
    resetNodes();
  };

  const swapNodes = (node1: Node, node2: Node) => {
    sendCommand(new SwapStartAndEndNodesCommand(node1, node2));
    resetNodes();
  };

  const handleBatchedNodes = () => {
    const optimisticWalls = Array.from(batchedNodesMap.values()).filter(
      (node) => node.isNotType("Wall", "Start", "End")
    );
    const optimisticEmpty = Array.from(batchedNodesMap.values()).filter(
      (node) => node.isNotType("Empty", "Start", "End")
    );

    if (optimisticWalls.length > 0) {
      sendCommand(new AddWallsCommand(optimisticWalls));
    }
    if (optimisticEmpty.length > 0) {
      sendCommand(new RemoveWallsCommand(optimisticEmpty));
    }
  };

  const resetNodes = () => {
    setStartNode(null);
    setEndNode(null);
    setTargetNode(null);
  };

  return (
    <div
      className={`my-4 ${startNode || endNode ? "cursor-move opacity-70" : ""}
    ${isAlgorithmRunning ? "pointer-events-none" : "cursor-cell"}`}
    >
      {grid.nodes.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((node) => (
            <div
              key={node.id}
              className={`${generateNodeClasses(
                node,
                batchedNodesMap.has(node.id),
                isAlgorithmRunning,
                !!startNode && !!targetNode?.equals(node),
                !!endNode && !!targetNode?.equals(node)
              )}`}
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
