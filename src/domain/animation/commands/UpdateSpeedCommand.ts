import { Command } from "../../interfaces/Command";
import { Speed } from "../valueObjects/Speed";

export class UpdateSpeedCommand extends Command {
  public static readonly type = "UpdateSpeedCommand";

  constructor(public readonly speed: Speed) {
    super(UpdateSpeedCommand.type);
  }
}
