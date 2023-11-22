import { CompositionRoot } from "@/bootstrapping/CompositionRoot";
import { MediatorProvider } from "@ui/adapters/mediator";
import { useEffect, useState } from "react";
import { compositionRoot as composition } from "../../bootstrapping/bootstrap";
import AppShell from "./AppShell";

type AppRootComponent = React.FC;

const AppRoot: AppRootComponent = () => {
  const [compositionRoot, setCompositionRoot] =
    useState<CompositionRoot | null>(null);

  useEffect(() => {
    setCompositionRoot(composition);
  }, []);

  return compositionRoot ? (
    <MediatorProvider mediator={compositionRoot.mediator}>
      <AppShell />
    </MediatorProvider>
  ) : null;
};

export default AppRoot;
