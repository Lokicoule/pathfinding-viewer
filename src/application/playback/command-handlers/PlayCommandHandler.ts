import { PlayCommand } from "../../../domain/commands/playback/PlayCommand";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { PlaybackStore } from "../../../infrastructure/stores/PlaybackStore";

export class PlayCommandHandler implements CommandHandler<PlayCommand> {
  constructor(private readonly playbackStore: PlaybackStore) {}

  execute(): void {
    console.log("PlayCommandHandler.execute()");
    this.playbackStore.setPlayback("PLAY");
  }
}
