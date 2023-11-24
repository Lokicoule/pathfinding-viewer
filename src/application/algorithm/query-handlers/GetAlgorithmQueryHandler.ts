import { GetAlgorithmQuery } from "@/domain/algorithm/queries/GetAlgorithmQuery";
import { QueryHandler } from "@/infrastructure/mediator";
import { AlgorithmStore } from "@/infrastructure/stores";
import { Algorithm } from "@domain/algorithm";

export class GetAlgorithmQueryHandler
  implements QueryHandler<GetAlgorithmQuery, Algorithm>
{
  public constructor(private readonly algorithmStore: AlgorithmStore) {}

  public execute(): Algorithm {
    return this.algorithmStore.getAlgorithm();
  }
}
