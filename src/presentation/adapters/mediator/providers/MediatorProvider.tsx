import { Mediator } from "../../../../application/mediator/Mediator";
import { MediatorContext } from "../contexts";

type MediatorProviderProps = {
  mediator: Mediator;
};

type MediatorProviderComponent = React.FC<
  React.PropsWithChildren<MediatorProviderProps>
>;

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
