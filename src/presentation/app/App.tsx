import { compositionRoot } from "../../bootstrapping/CompositionRoot";
import { MediatorProvider } from "../../infrastructure/mediator/react/MediatorProvider";
import Environment from "../components/Environment";

import "./App.css";

function App() {
  return (
    <div id="root">
      <MediatorProvider mediator={compositionRoot.mediator}>
        <Environment />
      </MediatorProvider>
    </div>
  );
}

export default App;
