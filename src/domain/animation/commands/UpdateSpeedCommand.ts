import { BaseCommand } from "@/infrastructure/mediator";
import { Speed } from "../valueObjects/Speed";

export class UpdateSpeedCommand extends BaseCommand {
  public static readonly commandName = "command:update-speed";

  constructor(public readonly speed: Speed) {
    super();
  }
}
