import { NodeInteractionCommand } from "../../../domain/commands/NodeInteractionCommand";
import { SelectedNodeType } from "../../../domain/enums/SelectedNodeType";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { Mediator } from "../../../infrastructure/mediator/Mediator";
import { ExperienceStore } from "../../../infrastructure/stores/ExperienceStore";
import { handleEmptyNodeClick } from "./handlers/handleEmptyNodeClick";
import { handleEndNodeChange } from "./handlers/handleEndNodeChange";
import { handleEndNodeClick } from "./handlers/handleEndNodeClick";
import { handleStartNodeChange } from "./handlers/handleStartNodeChange";
import { handleStartNodeClick } from "./handlers/handleStartNodeClick";
import { handleWallNodeClick } from "./handlers/handleWallNodeClick";

export class NodeInteractionCommandHandler
  implements CommandHandler<NodeInteractionCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly experienceStore: ExperienceStore
  ) {}

  public execute(command: NodeInteractionCommand) {
    console.log("NodeInteractionMediator", command);

    const selectedNodeType = this.experienceStore.getSelectedNodeType();

    if (
      selectedNodeType === SelectedNodeType.Start &&
      !command.node.isStart() &&
      !command.node.isEnd()
    ) {
      handleStartNodeChange(this.mediator, command);
    } else if (
      selectedNodeType === SelectedNodeType.End &&
      !command.node.isEnd() &&
      !command.node.isStart()
    ) {
      handleEndNodeChange(this.mediator, command);
    } else if (command.node.isStart()) {
      handleStartNodeClick(this.mediator);
    } else if (command.node.isEnd()) {
      handleEndNodeClick(this.mediator);
    } else if (command.node.isWall()) {
      handleWallNodeClick(this.mediator, command);
    } else if (
      command.node.isEmpty() ||
      command.node.isPath() ||
      command.node.isExplored()
    ) {
      handleEmptyNodeClick(this.mediator, command);
    }
  }
}
