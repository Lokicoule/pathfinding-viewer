import { compositionRoot } from "../../bootstrapping/bootstrap";
import { PlaybackStoreState } from "../../infrastructure/stores/PlaybackStore";
import { useStoreWithSelector } from "../adapters/store/hooks/useStoreWithSelector";

export const usePlayback = () => {
  return useStoreWithSelector<
    PlaybackStoreState,
    Pick<PlaybackStoreState, "playback">
  >(compositionRoot.stores.playbackStore, (state) => ({
    playback: state.playback,
  }));
};
