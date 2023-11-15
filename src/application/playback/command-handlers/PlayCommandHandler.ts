import { Command } from "../../../domain/interfaces/Command";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { PlaybackStore } from "../../../infrastructure/stores/PlaybackStore";

export class PlayCommandHandler<T extends Command>
  implements CommandHandler<T>
{
  constructor(private readonly playbackStore: PlaybackStore) {}

  execute(): void {
    this.playbackStore.setPlayback("PLAY");
  }
}
