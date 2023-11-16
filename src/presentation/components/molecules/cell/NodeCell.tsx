import React, { useEffect } from "react";
import { Node } from "../../../../domain/entities/Node";
import { NODE_PIXEL_SIZE } from "../../../../shared/constants";
import { concat } from "../../../utils/string";

import "./NodeCell.css";

type NodeCellProps = {
  node: Node;
  isSelected: boolean;
  isAlgorithmRunning: boolean;
  handleNodeClick: (node: Node) => void;
  handleMouseDown: (node: Node) => void;
  handleMouseEnter: (node: Node) => void;
  handleMouseUp: () => void;
};

const NodeCell: React.FC<NodeCellProps> = React.memo(
  ({
    node,
    isAlgorithmRunning,
    isSelected,
    handleNodeClick,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  }) => {
    const [isActivated, setIsActivated] = React.useState(false);

    useEffect(() => {
      console.log("Node component rendered");
    });

    const cellState = (node: Node) => {
      if (node.isStart() || node.isHighlighted()) {
        return "start";
      } else if (node.isEnd()) {
        return "end";
      } else if (
        (node.isWall() && !isSelected) ||
        (isSelected && !node.isWall())
      ) {
        return concat("wall", isAlgorithmRunning ? "bounding" : "");
      } else if (node.isEmpty() || (isSelected && node.isWall())) {
        return concat("empty", isAlgorithmRunning ? "bounding" : "");
      } else if (node.isExplored()) {
        return concat("explored", isAlgorithmRunning ? "exploring" : "");
      } else if (node.isPath()) {
        return concat("path", isAlgorithmRunning ? "pathing" : "");
      }
    };

    const handleClick = (node: Node) => {
      if (node.isStart() || node.isEnd()) setIsActivated(true);
      handleNodeClick(node);
    };

    return (
      <div
        key={node.id}
        className={concat(
          "cell",
          cellState(node),
          isActivated ? "activated" : ""
        )}
        style={{
          width: `${NODE_PIXEL_SIZE}px`,
          height: `${NODE_PIXEL_SIZE}px`,
          pointerEvents: isAlgorithmRunning ? "none" : "auto",
        }}
        onClick={() => handleClick(node)}
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
    );
  }
);

export default NodeCell;
