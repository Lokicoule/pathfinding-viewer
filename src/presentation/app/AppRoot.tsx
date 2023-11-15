import { compositionRoot } from "../../bootstrapping/bootstrap";
import { MediatorProvider } from "../adapters/mediator/MediatorProvider";
import AppShell from "./AppShell";

import "./App.css";

type AppRootComponent = React.FC;

const AppRoot: AppRootComponent = () => {
  return (
    <MediatorProvider mediator={compositionRoot.mediator}>
      <AppShell />
    </MediatorProvider>
  );
};

export default AppRoot;
