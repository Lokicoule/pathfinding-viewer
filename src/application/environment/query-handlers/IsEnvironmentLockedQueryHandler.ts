import { IsEnvironmentLockedQuery } from "@domain/environment";
import { QueryHandlerContract } from "@infra/cqrs";
import { EnvironmentStore } from "@infra/stores";

export class IsEnvironmentLockedQueryHandler
  implements QueryHandlerContract<IsEnvironmentLockedQuery, boolean>
{
  public constructor(private readonly environmentStore: EnvironmentStore) {}

  execute(): boolean {
    return this.environmentStore.isLocked();
  }
}
