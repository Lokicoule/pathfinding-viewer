import { compositionRoot } from "../../bootstrapping/bootstrap";
import { MediatorProvider } from "../adapters/mediator/providers";
import Experience from "../components/Experience";
import { StoreProvider } from "../store/StoreProvider";

import "./App.css";

function App() {
  const stores = {
    gridStore: compositionRoot.gridStore,
    experienceStore: compositionRoot.experienceStore,
  };

  return (
    <MediatorProvider mediator={compositionRoot.mediator}>
      <StoreProvider stores={stores}>
        <div className="container">
          <div className="header">
            <h1>Pathfinding Visualizer</h1>
          </div>
          <div className="content">
            <Experience />
          </div>
        </div>
      </StoreProvider>
    </MediatorProvider>
  );
}

export default App;
