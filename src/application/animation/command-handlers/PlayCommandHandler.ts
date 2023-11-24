import { CommandHandler } from "@/infrastructure/mediator";
import { PlaybackStore } from "@infra/stores/PlaybackStore";

export class PlayCommandHandler implements CommandHandler {
  constructor(private readonly playbackStore: PlaybackStore) {}

  execute(): void {
    console.log("PlayCommandHandler.execute()");

    this.playbackStore.setPlayback("PLAY");
  }
}
