import { EnvironmentController } from "../presentation/components/EnvironmentController";
import { EnvironmentPresenter } from "../presentation/components/EnvironmentPresenter";
import { EventBus } from "./EventBus";
import { GlobalCache } from "./GlobalCache";
import { InitializeGridCommand } from "./commands";
import { InitializeGridCommandHandler } from "./commands/handlers/InitializeGridCommandHandler";
import { ResetGridCommandHandler } from "./commands/handlers/ResetGridCommandHandler";
import { UpdateCellStateCommandHandler } from "./commands/handlers/UpdateCellStateCommandHandler";

export class CompositionRoot {
  private __cache: GlobalCache;
  private __eventBus: EventBus;

  private __updateCellStateCommandHandler: UpdateCellStateCommandHandler;
  private __resetGridCommandHandler: ResetGridCommandHandler;
  private __initializeGridCommandHandler: InitializeGridCommandHandler;

  private __environmentController: EnvironmentController;
  private __environmentPresenter: EnvironmentPresenter;

  private constructor() {
    this.__cache = GlobalCache.create();
    this.__eventBus = EventBus.create();

    this.__environmentController = EnvironmentController.create(this);
    this.__environmentPresenter = EnvironmentPresenter.create(this.cache);

    this.__updateCellStateCommandHandler =
      UpdateCellStateCommandHandler.create(this);
    this.__resetGridCommandHandler = ResetGridCommandHandler.create(this);
    this.__initializeGridCommandHandler =
      InitializeGridCommandHandler.create(this);

    this.setupSubscriptions();

    this.__eventBus.publish(InitializeGridCommand.create());
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

  public get environmentPresenter(): EnvironmentPresenter {
    return this.__environmentPresenter;
  }

  private setupSubscriptions(): void {
    this.__updateCellStateCommandHandler.setupSubscription();
    this.__resetGridCommandHandler.setupSubscription();
    this.__initializeGridCommandHandler.setupSubscription();
  }
}

export const compositionRoot = CompositionRoot.create();
