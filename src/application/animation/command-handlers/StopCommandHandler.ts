import { CommandHandler } from "@/infrastructure/mediator";
import { PlaybackStore } from "@infra/stores/PlaybackStore";

export class StopCommandHandler implements CommandHandler {
  constructor(private readonly playbackStore: PlaybackStore) {}

  execute(): void {
    console.log("StopCommandHandler.execute()");

    this.playbackStore.setPlayback("STOP");
  }
}
