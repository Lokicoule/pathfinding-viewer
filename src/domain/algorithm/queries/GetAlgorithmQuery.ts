import { QueryBase } from "@/infrastructure/mediator";

export class GetAlgorithmQuery extends QueryBase {
  public static readonly type = "GetAlgorithmQuery";

  constructor() {
    super(GetAlgorithmQuery.type);
  }
}
