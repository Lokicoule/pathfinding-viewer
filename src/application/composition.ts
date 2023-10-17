import { EnvironmentController } from "../components/EnvironmentController";
import { EventBus } from "./EventBus";
import { GlobalCache } from "./GlobalCache";
import { ResetGridCommandHandler } from "./commands/handlers/ResetGridCommandHandler";
import { UpdateCellStateCommandHandler } from "./commands/handlers/UpdateCellStateCommandHandler";

export class CompositionRoot {
  private __cache: GlobalCache;
  private __eventBus: EventBus;

  private __updateCellStateCommandHandler: UpdateCellStateCommandHandler;
  private __resetGridCommandHandler: ResetGridCommandHandler;

  private __environmentController: EnvironmentController;

  private constructor() {
    this.__cache = GlobalCache.create();
    this.__eventBus = EventBus.create();

    this.__environmentController = EnvironmentController.create(this);

    this.__updateCellStateCommandHandler =
      UpdateCellStateCommandHandler.create(this);
    this.__resetGridCommandHandler = ResetGridCommandHandler.create(this);

    this.setupSubscriptions();
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

  public get environmentController(): EnvironmentController {
    return this.__environmentController;
  }

  private setupSubscriptions(): void {
    this.__updateCellStateCommandHandler.setupSubscription();
    this.__resetGridCommandHandler.setupSubscription();
  }
}

export const compositionRoot = CompositionRoot.create();
