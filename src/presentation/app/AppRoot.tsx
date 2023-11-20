import { compositionRoot } from "../../bootstrapping/bootstrap";
import { MediatorProvider } from "../adapters/mediator";
import AppShell from "./AppShell";

type AppRootComponent = React.FC;

const AppRoot: AppRootComponent = () => {
  return (
    <MediatorProvider mediator={compositionRoot.mediator}>
      <AppShell />
    </MediatorProvider>
  );
};

export default AppRoot;
