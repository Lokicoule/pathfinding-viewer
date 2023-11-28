import { GlobalState } from "@/bootstrapping/GlobalState";
import { SetAlgorithmCommand } from "@/domain/algorithm";
import { GetAlgorithmQuery } from "@/domain/algorithm/queries/GetAlgorithmQuery";
import { Mediator } from "@/infrastructure/mediator";
import { SetAlgorithmCommandHandler } from "./command-handlers";
import { GetAlgorithmQueryHandler } from "./query-handlers";

export class AlgorithmModule {
  static register(mediator: Mediator, stores: GlobalState) {
    mediator.registerCommandHandler(
      SetAlgorithmCommand,
      new SetAlgorithmCommandHandler(mediator, stores.algorithmStore)
    );
    mediator.registerQueryHandler(
      GetAlgorithmQuery.type,
      new GetAlgorithmQueryHandler(stores.algorithmStore)
    );
  }
}
