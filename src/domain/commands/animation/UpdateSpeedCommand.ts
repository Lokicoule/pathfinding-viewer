import { Command } from "../../interfaces/Command";
import { Speed } from "../../valueObjects/Speed";

export class UpdateSpeedCommand extends Command {
  constructor(public readonly speed: Speed) {
    super("UpdateSpeedCommand");
  }
}
