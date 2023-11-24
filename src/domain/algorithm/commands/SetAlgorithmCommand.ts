import { CommandBaseWithPayload } from "@/infrastructure/mediator";
import { AlgorithmType } from "../types/AlgorithmType";

type SetAlgorithmCommandPayload = {
  algorithm: AlgorithmType;
};

export class SetAlgorithmCommand extends CommandBaseWithPayload<SetAlgorithmCommandPayload> {
  public static readonly type = "SetAlgorithmCommand";

  constructor(algorithm: AlgorithmType) {
    super(SetAlgorithmCommand.type, { algorithm });
  }
}
