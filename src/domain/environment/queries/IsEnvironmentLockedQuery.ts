import { BaseQuery } from "@infra/cqrs";

export class IsEnvironmentLockedQuery extends BaseQuery {
  public static readonly queryName = "query:is-environment-locked";
}
