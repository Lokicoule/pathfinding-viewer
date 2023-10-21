import { compositionRoot } from "../../bootstrapping/CompositionRoot";
import { MediatorProvider } from "../../infrastructure/mediator/react";
import Environment from "../components/Experience";

import "./App.css";

function App() {
  return (
    <MediatorProvider mediator={compositionRoot.mediator}>
      <Environment />
    </MediatorProvider>
  );
}

export default App;
