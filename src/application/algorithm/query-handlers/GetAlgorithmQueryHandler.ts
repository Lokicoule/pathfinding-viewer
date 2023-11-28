import { Algorithm, GetAlgorithmQuery } from "@domain/algorithm";
import { QueryHandlerContract } from "@infra/cqrs";
import { AlgorithmStore } from "@infra/stores";

export class GetAlgorithmQueryHandler
  implements QueryHandlerContract<GetAlgorithmQuery, Algorithm>
{
  public constructor(private readonly algorithmStore: AlgorithmStore) {}

  public execute(): Algorithm {
    return this.algorithmStore.getAlgorithm();
  }
}
