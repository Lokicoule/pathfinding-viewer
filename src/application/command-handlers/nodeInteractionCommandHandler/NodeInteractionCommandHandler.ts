import { NodeInteractionCommand } from "../../../domain/commands/NodeInteractionCommand";
import { SwapStartAndEndNodesCommand } from "../../../domain/commands/SwapStartAndEndNodesCommand";
import { Node } from "../../../domain/entities/Node";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { Mediator } from "../../mediator/Mediator";
import { ExperienceStore } from "../../stores/ExperienceStore";
import { handleEmptyNodeClick } from "./handlers/handleEmptyNodeClick";
import { handleEndNodeChange } from "./handlers/handleEndNodeChange";
import { handleStartNodeChange } from "./handlers/handleStartNodeChange";
import { handleWallNodeClick } from "./handlers/handleWallNodeClick";
export class NodeInteractionCommandHandler
  implements CommandHandler<NodeInteractionCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly experienceStore: ExperienceStore
  ) {}

  public execute(command: NodeInteractionCommand) {
    const lastInteractedNode = this.experienceStore.getLastInteractedNode();
    const previousLastInteractedNode =
      this.experienceStore.getPreviousLastInteractedNode();

    this.experienceStore.setLastInteractedNode(command.node);

    const { node } = command;

    if (lastInteractedNode?.isStart() && !previousLastInteractedNode?.isEnd()) {
      this.handleStartNodeInteraction(node, command);
    } else if (
      lastInteractedNode?.isEnd() &&
      !previousLastInteractedNode?.isStart()
    ) {
      this.handleEndNodeInteraction(node, command);
    } else {
      this.handleOtherNodeInteraction(node, command);
    }
  }

  private handleStartNodeInteraction(
    node: Node,
    command: NodeInteractionCommand
  ) {
    if (!node.isStart() && !node.isEnd()) {
      handleStartNodeChange(this.mediator, command);
    } else if (node.isEnd()) {
      this.swapStartAndEndNodes();
    }
  }

  private handleEndNodeInteraction(
    node: Node,
    command: NodeInteractionCommand
  ) {
    if (!node.isEnd() && !node.isStart()) {
      handleEndNodeChange(this.mediator, command);
    } else if (node.isStart()) {
      this.swapStartAndEndNodes();
    }
  }

  private handleOtherNodeInteraction(
    node: Node,
    command: NodeInteractionCommand
  ) {
    if (node.isWall()) {
      handleWallNodeClick(this.mediator, command);
    } else if (node.isEmpty() || node.isPath() || node.isExplored()) {
      handleEmptyNodeClick(this.mediator, command);
    }
  }

  private swapStartAndEndNodes() {
    this.mediator.sendCommand(
      SwapStartAndEndNodesCommand.name,
      new SwapStartAndEndNodesCommand()
    );
  }
}
