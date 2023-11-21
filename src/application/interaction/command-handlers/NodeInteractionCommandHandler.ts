import { NodeInteractionCommand } from "@domain/commands/NodeInteractionCommand";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { ExperienceStore } from "@infra/stores/ExperienceStore";
import { GridStore } from "@infra/stores/GridStore";

export class NodeInteractionCommandHandler
  implements CommandHandler<NodeInteractionCommand>
{
  constructor(
    private readonly experienceStore: ExperienceStore,
    private readonly gridStore: GridStore
  ) {}

  public execute(command: NodeInteractionCommand) {
    const lastInteractedNode = this.experienceStore.getLastInteractedNode();
    const previousNode = this.experienceStore.getPreviousLastInteractedNode();

    if (lastInteractedNode?.isType("Start") && previousNode?.isNotType("End")) {
      console.log("Start");
      this.handleStartNodeInteraction(command);
    } else if (
      lastInteractedNode?.isType("End") &&
      previousNode?.isNotType("Start")
    ) {
      console.log("End");
      this.handleEndNodeInteraction(command);
    } else {
      this.handleOtherNodeInteraction(command);
    }

    this.experienceStore.setLastInteractedNode(command.node);
  }

  private handleStartNodeInteraction(command: NodeInteractionCommand) {
    if (command.node.isNotType("Start", "End")) {
      const node = this.gridStore.getNode(command.node.getVector());

      if (!node || node.isOneOf("Start", "End")) return;

      const setStartNodeResult = this.gridStore.setStartNode(
        command.node.getVector()
      );

      if (!setStartNodeResult.success) {
        console.error(
          `SetStartNodeCommandHandler - setStartNode: ${setStartNodeResult.error}`
        );
      }
    } else if (command.node.isType("End")) {
      this.swapStartAndEndNodes();
    }
  }

  private handleEndNodeInteraction(command: NodeInteractionCommand) {
    if (command.node.isNotType("Start", "End")) {
      const node = this.gridStore.getNode(command.node.getVector());

      if (!node || node.isOneOf("Start", "End")) return;

      const setEndNodeResult = this.gridStore.setEndNode(
        command.node.getVector()
      );

      if (!setEndNodeResult.success) {
        console.error(
          `SetEndNodeCommandHandler - setEndNode: ${setEndNodeResult.error}`
        );
      }
    } else if (command.node.isType("Start")) {
      this.swapStartAndEndNodes();
    }
  }

  private handleOtherNodeInteraction(command: NodeInteractionCommand) {
    if (command.node.isType("Wall")) {
      const node = this.gridStore.getNode(command.node.getVector());

      if (!node || node.isNotType("Wall")) return;

      const result = this.gridStore.setNodeAs(
        command.node.getVector(),
        command.node.getPreviousType() === "Wall"
          ? "Empty"
          : command.node.getPreviousType()
      );

      if (!result.success) {
        console.error("RemoveWallCommandHandler", result.error);
      }
    } else if (command.node.isOneOf("Empty", "Path", "Explored")) {
      const node = this.gridStore.getNode(command.node.getVector());

      if (!node || node.isOneOf("Start", "End")) return;

      const result = this.gridStore.setNodeAs(command.node.getVector(), "Wall");

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
