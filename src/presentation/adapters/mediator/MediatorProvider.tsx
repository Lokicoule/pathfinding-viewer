import { createContext } from "react";
import { Mediator } from "../../../infrastructure/mediator/Mediator";

type MediatorProviderProps = {
  mediator: Mediator;
};

type MediatorProviderComponent = React.FC<
  React.PropsWithChildren<MediatorProviderProps>
>;

export const MediatorContext = createContext<Mediator | null>(null);

export const MediatorProvider: MediatorProviderComponent = ({
  mediator,
  children,
}) => {
  return (
    <MediatorContext.Provider value={mediator}>
      {children}
    </MediatorContext.Provider>
  );
};
