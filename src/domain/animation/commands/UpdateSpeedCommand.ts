import { CommandBaseWithPayload } from "@/infrastructure/mediator";
import { Speed } from "../valueObjects/Speed";

type UpdateSpeedCommandPayload = {
  speed: Speed;
};
export class UpdateSpeedCommand extends CommandBaseWithPayload<UpdateSpeedCommandPayload> {
  public static readonly type = "UpdateSpeedCommand";

  constructor(public readonly speed: Speed) {
    super(UpdateSpeedCommand.type, { speed });
  }
}
