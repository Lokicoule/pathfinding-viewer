import { Node } from "@/domain/environment/entities";

export const generateNodeClasses = (
  node: Node,
  optimistic: boolean,
  animate: boolean,
  isOptimisticStart: boolean,
  isOptimisticEnd: boolean
): string => {
  const baseClasses = "cell cursor-cell";

  if (optimistic) {
    return `${baseClasses} ${generateOptimisticNonClickedClass(node)}`;
  } else if (isOptimisticStart || isOptimisticEnd) {
    return `${baseClasses} ${generateOptimisticClickedClass(
      isOptimisticStart
    )}`;
  } else {
    return `${baseClasses} ${generateNodeClass(
      node,
      animate,
      isOptimisticStart,
      isOptimisticEnd
    )}`;
  }
};

const generateOptimisticNonClickedClass = (node: Node): string => {
  return node.isNotType("Wall") ? "wall" : "empty";
};

const generateOptimisticClickedClass = (isOptimisticStart: boolean): string => {
  return isOptimisticStart ? "start" : "end";
};

const generateNodeClass = (
  node: Node,
  animate: boolean,
  isOptimisticStart: boolean,
  isOptimisticEnd: boolean
): string => {
  if (node.isOneOf("Start", "Highlighted") || isOptimisticStart) {
    return "start";
  } else if (node.isType("End") || isOptimisticEnd) {
    return "end";
  } else {
    return generateAnimatedNodeClass(node, animate);
  }
};

const generateAnimatedNodeClass = (node: Node, animate: boolean): string => {
  if (node.isType("Empty")) {
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
