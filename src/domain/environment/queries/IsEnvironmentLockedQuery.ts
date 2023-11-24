import { QueryBase } from "@/infrastructure/mediator";

export class IsEnvironmentLockedQuery extends QueryBase {
  public static readonly type = "IsEnvironmentLockedQuery";

  constructor() {
    super(IsEnvironmentLockedQuery.type);
  }
}
