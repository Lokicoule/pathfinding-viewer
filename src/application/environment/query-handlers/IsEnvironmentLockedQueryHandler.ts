import { IsEnvironmentLockedQuery } from "@/domain/environment/queries/IsEnvironmentLockedQuery";
import { QueryHandler } from "@/infrastructure/mediator";
import { EnvironmentStore } from "@/infrastructure/stores/EnvironmentStore";

export class IsEnvironmentLockedQueryHandler
  implements QueryHandler<IsEnvironmentLockedQuery, boolean>
{
  public constructor(private readonly environmentStore: EnvironmentStore) {}

  execute(): boolean {
    return this.environmentStore.isLocked();
  }
}
