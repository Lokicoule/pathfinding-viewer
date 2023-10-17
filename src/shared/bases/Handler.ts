import { CompositionRoot } from "../../application/CompositionRoot";

export abstract class Handler<T> {
  constructor(
    protected readonly compositionRoot: CompositionRoot,
    public readonly name: string
  ) {}

  abstract handle(command: T): void;
}
