import { EventBus } from "./EventBus";
import { GlobalCache } from "./GlobalCache";
import { UpdateCellStateCommand } from "./commands";
import { UpdateCellStateCommandHandler } from "./commands/handlers/UpdateCellStateCommandHandler";

export class CompositionRoot {
  private __cache: GlobalCache;
  private __eventBus: EventBus;
  private __updateCellStateCommandHandler: UpdateCellStateCommandHandler;

  private constructor() {
    this.__cache = GlobalCache.create();
    this.__eventBus = EventBus.create();

    this.__updateCellStateCommandHandler = UpdateCellStateCommandHandler.create(
      this.__eventBus
    );

    this.setupEventBus();
  }

  public static create(): CompositionRoot {
    return new CompositionRoot();
  }

  public get cache(): GlobalCache {
    return this.__cache;
  }

  public get eventBus(): EventBus {
    return this.__eventBus;
  }

  private setupEventBus(): void {
    this.__eventBus.subscribe(
      UpdateCellStateCommand.name,
      this.__updateCellStateCommandHandler
    );
  }
}

export const compositionRoot = CompositionRoot.create();
