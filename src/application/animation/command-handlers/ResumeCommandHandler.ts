import { CommandHandler } from "@/infrastructure/mediator";
import { PlaybackStore } from "@infra/stores/PlaybackStore";

export class ResumeCommandHandler implements CommandHandler {
  constructor(private readonly playbackStore: PlaybackStore) {}

  execute(): void {
    this.playbackStore.setPlayback("RESUME");
  }
}
