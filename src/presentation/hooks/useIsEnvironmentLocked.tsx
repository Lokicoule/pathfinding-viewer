import {
  EnvironmentLockedEvent,
  EnvironmentUnlockedEvent,
  IsEnvironmentLockedQuery,
} from "@domain/environment";
import { useEventListener } from "../adapters/mediator/hooks";
import { useQuery } from "../adapters/mediator/hooks/useQuery";

export const useIsEnvironmentLocked = () => {
  const [{ result, loading, error }, callback] = useQuery<
    IsEnvironmentLockedQuery,
    boolean
  >(new IsEnvironmentLockedQuery());

  useEventListener(EnvironmentLockedEvent, callback);
  useEventListener(EnvironmentUnlockedEvent, callback);

  return { isEnvironmentLocked: result ? result : false, loading, error };
};
