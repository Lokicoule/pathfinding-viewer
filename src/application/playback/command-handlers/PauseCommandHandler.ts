import { PauseCommand } from "../../../domain/commands/playback/PauseCommand";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { PlaybackStore } from "../../../infrastructure/stores/PlaybackStore";

export class PauseCommandHandler implements CommandHandler<PauseCommand> {
  constructor(private readonly playbackStore: PlaybackStore) {}

  execute(): void {
    console.log("PauseCommandHandler.execute()");
    this.playbackStore.setPlayback("PAUSE");
  }
}
