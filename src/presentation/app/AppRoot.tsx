import { MediatorProvider } from "@ui/adapters/mediator";
import { compositionRoot } from "../../bootstrapping/bootstrap";
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
