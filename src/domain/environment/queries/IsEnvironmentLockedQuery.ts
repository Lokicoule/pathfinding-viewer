import { BaseQuery } from "@/infrastructure/cqrs/query/models";

export class IsEnvironmentLockedQuery extends BaseQuery {
  public static readonly queryName = "query:is-environment-locked";
}
