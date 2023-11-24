import { EnvironmentLockedEvent } from "@/domain/environment/events/EnvironmentLockedEvent";
import { EnvironmentUnlockedEvent } from "@/domain/environment/events/EnvironmentUnlockedEvent";
import { IsEnvironmentLockedQuery } from "@/domain/environment/queries/IsEnvironmentLockedQuery";
import { useEventListener } from "../adapters/mediator/hooks";
import { useQuery } from "../adapters/mediator/hooks/useQuery";

export const useIsEnvironmentLocked = () => {
  const [{ result, loading, error }, callback] = useQuery<
    IsEnvironmentLockedQuery,
    boolean
  >(new IsEnvironmentLockedQuery());

  useEventListener(EnvironmentLockedEvent.type, callback);
  useEventListener(EnvironmentUnlockedEvent.type, callback);

  return { isEnvironmentLocked: result ? result : false, loading, error };
};
