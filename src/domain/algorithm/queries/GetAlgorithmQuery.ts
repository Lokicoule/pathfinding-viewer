import { BaseQuery } from "@infra/cqrs/query/models";

export class GetAlgorithmQuery extends BaseQuery {
  public static readonly queryName = "query:get-algorithm";
}
