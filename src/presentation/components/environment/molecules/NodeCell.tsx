import { useAlgorithm } from "@/presentation/hooks";
import { NODE_PIXEL_SIZE } from "@/shared/constants";
import { Node } from "@domain/entities/Node";
import React, { useEffect } from "react";

import "./NodeCell.css";

type NodeCellProps = {
  node: Node;
  handleNodeClick: (node: Node) => void;
  handleMouseDown: (node: Node) => void;
  handleMouseEnter: (node: Node) => void;
  handleMouseUp: () => void;
};

const cellState = (node: Node, isAlgorithmRunning: boolean) => {
  /* if (isNodeInBatch) {
    if (!node.isWall()) {
      return "wall";
    } else if (node.isWall()) {
      return "empty";
    }
  } else  */ if (node.isOneOf("Start", "Highlighted")) {
    return "start";
  } else if (node.isType("End")) {
    return "end";
  } else if (node.isType("Empty")) {
    return `empty ${isAlgorithmRunning ? "bounding" : ""}`;
  } else if (node.isType("Explored")) {
    return `explored ${isAlgorithmRunning ? "exploring" : ""}`;
  } else if (node.isType("Path")) {
    return `path ${isAlgorithmRunning ? "pathing" : ""}`;
  } else if (node.isType("Wall")) {
    return `wall ${isAlgorithmRunning ? "bounding" : ""}`;
  } else {
    return "";
  }
};

const NodeCell: React.FC<NodeCellProps> = React.memo(
  ({
    node,
    handleNodeClick,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  }) => {
    const { isAlgorithmRunning } = useAlgorithm();

    useEffect(() => {
      console.log(
        "NodeCell rendered" /* , node.getVector().x, node.getVector().y */
      );
    });

    return (
      <div
        className={`cell ${cellState(node, isAlgorithmRunning)} 
        ${!isAlgorithmRunning ? "cursor-cell" : "pointer-events-none"}`}
        style={{
          width: `${NODE_PIXEL_SIZE}px`,
          height: `${NODE_PIXEL_SIZE}px`,
        }}
        onClick={() => handleNodeClick(node)}
        onMouseDown={
          node.isNotType("Start", "End")
            ? () => handleMouseDown(node)
            : undefined
        }
        onMouseEnter={
          node.isNotType("Start", "End")
            ? () => handleMouseEnter(node)
            : undefined
        }
        onMouseUp={() => handleMouseUp()}
        onBlur={() => handleMouseUp()}
      />
    );
  }
);

export default NodeCell;
