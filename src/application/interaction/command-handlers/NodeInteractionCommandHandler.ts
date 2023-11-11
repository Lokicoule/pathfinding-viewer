import { NodeInteractionCommand } from "../../../domain/commands/NodeInteractionCommand";
import { NodeType } from "../../../domain/enums/NodeType";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { ExperienceStore } from "../../../infrastructure/stores/ExperienceStore";
import { GridStore } from "../../../infrastructure/stores/GridStore";

export class NodeInteractionCommandHandler
  implements CommandHandler<NodeInteractionCommand>
{
  constructor(
    private readonly experienceStore: ExperienceStore,
    private readonly gridStore: GridStore
  ) {}

  public execute(command: NodeInteractionCommand) {
    const lastInteractedNode = this.experienceStore.getLastInteractedNode();
    const previousLastInteractedNode =
      this.experienceStore.getPreviousLastInteractedNode();

    this.experienceStore.setLastInteractedNode(command.node);

    if (lastInteractedNode?.isStart() && !previousLastInteractedNode?.isEnd()) {
      this.handleStartNodeInteraction(command);
    } else if (
      lastInteractedNode?.isEnd() &&
      !previousLastInteractedNode?.isStart()
    ) {
      this.handleEndNodeInteraction(command);
    } else {
      this.handleOtherNodeInteraction(command);
    }
  }

  private handleStartNodeInteraction(command: NodeInteractionCommand) {
    if (!command.node.isStart() && !command.node.isEnd()) {
      const node = this.gridStore.getNode(command.node.getVector());

      if (!node || [NodeType.Start, NodeType.End].includes(node.getType()))
        return;

      const setStartNodeResult = this.gridStore.setStartNode(
        command.node.getVector()
      );

      if (!setStartNodeResult.success) {
        console.error(
          `SetStartNodeCommandHandler - setStartNode: ${setStartNodeResult.error}`
        );
      }
    } else if (command.node.isEnd()) {
      this.swapStartAndEndNodes();
    }
  }

  private handleEndNodeInteraction(command: NodeInteractionCommand) {
    if (!command.node.isEnd() && !command.node.isStart()) {
      const node = this.gridStore.getNode(command.node.getVector());

      if (!node || [NodeType.Start, NodeType.End].includes(node.getType()))
        return;

      const setEndNodeResult = this.gridStore.setEndNode(
        command.node.getVector()
      );

      if (!setEndNodeResult.success) {
        console.error(
          `SetEndNodeCommandHandler - setEndNode: ${setEndNodeResult.error}`
        );
      }
    } else if (command.node.isStart()) {
      this.swapStartAndEndNodes();
    }
  }

  private handleOtherNodeInteraction(command: NodeInteractionCommand) {
    if (command.node.isWall()) {
      const node = this.gridStore.getNode(command.node.getVector());

      if (!node || node.getType() !== NodeType.Wall) return;

      const result = this.gridStore.setNodeAs(
        command.node.getVector(),
        command.node.getPreviousType() === NodeType.Wall
          ? NodeType.Empty
          : command.node.getPreviousType()
      );

      if (!result.success) {
        console.error("RemoveWallCommandHandler", result.error);
      }
    } else if (
      command.node.isEmpty() ||
      command.node.isPath() ||
      command.node.isExplored()
    ) {
      const node = this.gridStore.getNode(command.node.getVector());

      if (!node || [NodeType.Start, NodeType.End].includes(node.getType()))
        return;

      const result = this.gridStore.setNodeAs(
        command.node.getVector(),
        NodeType.Wall
      );

      if (!result.success) {
        console.error(`AddWallCommandHandler - ${result.error}`);
      }
    }
  }

  private swapStartAndEndNodes() {
    const result = this.gridStore.swapStartAndEndNodes();

    if (!result.success) {
      console.error("swapStartAndEndNodes", result.error);
    }
  }
}
