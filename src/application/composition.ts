import { EventBus } from "./EventBus";
import { UpdateCellStateCommand } from "./commands";
import { UpdateCellStateCommandHandler } from "./commands/handlers/UpdateCellStateCommandHandler";

export class CompositionRoot {
  private __eventBus: EventBus;
  private __updateCellStateCommandHandler: UpdateCellStateCommandHandler;

  private constructor() {
    this.__eventBus = EventBus.create();

    this.__updateCellStateCommandHandler = UpdateCellStateCommandHandler.create(
      this.__eventBus
    );

    this.setupEventBus();
  }

  public static create(): CompositionRoot {
    return new CompositionRoot();
  }

  private setupEventBus(): void {
    this.__eventBus.subscribe(
      UpdateCellStateCommand.name,
      this.__updateCellStateCommandHandler
    );
  }

  public get eventBus(): EventBus {
    return this.__eventBus;
  }
}

export const compositionRoot = CompositionRoot.create();
