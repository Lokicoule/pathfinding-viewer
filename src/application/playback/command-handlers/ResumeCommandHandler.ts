import { ResumeCommand } from "../../../domain/commands/playback/ResumeCommand";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { PlaybackStore } from "../../../infrastructure/stores/PlaybackStore";

export class ResumeCommandHandler implements CommandHandler<ResumeCommand> {
  constructor(private readonly playbackStore: PlaybackStore) {}

  execute(): void {
    console.log("ResumeCommandHandler.execute()");
    this.playbackStore.setPlayback("RESUME");
  }
}
