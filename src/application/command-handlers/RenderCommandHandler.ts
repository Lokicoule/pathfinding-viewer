import { RenderCommand } from "../../domain/commands/RenderCommand";
import { RenderedEvent } from "../../domain/events/RenderedEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Mediator } from "../mediator/Mediator";

export class RenderCommandHandler implements CommandHandler<RenderCommand> {
  constructor(private readonly mediator: Mediator) {}

  execute(): void {
    this.mediator.sendEvent(RenderedEvent.name, new RenderedEvent());
  }
}
