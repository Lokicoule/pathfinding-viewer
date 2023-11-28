import { GetAlgorithmQuery } from "@/domain/algorithm/queries/GetAlgorithmQuery";
import { QueryHandlerContract } from "@/infrastructure/cqrs/query/contracts";
import { AlgorithmStore } from "@/infrastructure/stores";
import { Algorithm } from "@domain/algorithm";

export class GetAlgorithmQueryHandler
  implements QueryHandlerContract<GetAlgorithmQuery, Algorithm>
{
  public constructor(private readonly algorithmStore: AlgorithmStore) {}

  public execute(): Algorithm {
    return this.algorithmStore.getAlgorithm();
  }
}
