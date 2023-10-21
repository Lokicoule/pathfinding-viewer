import { Mediator } from "../infrastructure/mediator/Mediator";
import { InitializeGridCommandHandler } from "../application/command-handlers/InitializeGridCommandHandler";
import { InitializeGridCommand } from "../domain/commands/InitializeGridCommand";

export class CompositionRoot {
  private constructor(public readonly mediator: Mediator) {
    this.initialize();
  }

  public static create() {
    const mediator = new Mediator();

    return new CompositionRoot(mediator);
  }

  public initialize() {
    this.mediator.registerCommandHandler(
      InitializeGridCommand.name,
      new InitializeGridCommandHandler()
    );
  }
}

export const compositionRoot = CompositionRoot.create();
