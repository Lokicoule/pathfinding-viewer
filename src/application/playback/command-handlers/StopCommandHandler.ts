import { StopCommand } from "../../../domain/commands/playback/StopCommand";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { PlaybackStore } from "../../../infrastructure/stores/PlaybackStore";

export class StopCommandHandler implements CommandHandler<StopCommand> {
  constructor(private readonly playbackStore: PlaybackStore) {}

  execute(): void {
    console.log("StopCommandHandler.execute()");
    this.playbackStore.setPlayback("STOP");
  }
}
