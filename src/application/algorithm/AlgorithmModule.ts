import { GlobalState } from "@/bootstrapping/GlobalState";
import { GetAlgorithmQuery, SetAlgorithmCommand } from "@domain/algorithm";
import { Mediator } from "@infra/mediator";
import { SetAlgorithmCommandHandler } from "./command-handlers";
import { GetAlgorithmQueryHandler } from "./query-handlers";

export class AlgorithmModule {
  static register(mediator: Mediator, stores: GlobalState) {
    mediator.registerCommandHandler(
      SetAlgorithmCommand,
      new SetAlgorithmCommandHandler(mediator, stores.algorithmStore)
    );
    mediator.registerQueryHandler(
      GetAlgorithmQuery,
      new GetAlgorithmQueryHandler(stores.algorithmStore)
    );
  }
}
