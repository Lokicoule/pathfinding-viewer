import { compositionRoot } from "../../bootstrapping/bootstrap";
import { MediatorProvider } from "../contexts/mediator/MediatorProvider";
import { GridStoreProvider } from "../../infrastructure/stores/react/GridStoreProvider";
import Experience from "../components/Experience";

import "./App.css";

function App() {
  return (
    <MediatorProvider mediator={compositionRoot.mediator}>
      <GridStoreProvider store={compositionRoot.gridStore}>
        <div className="container">
          <div className="header">
            <h1>Pathfinding Visualizer</h1>
          </div>
          <div className="content">
            <Experience />
          </div>
        </div>
      </GridStoreProvider>
    </MediatorProvider>
  );
}

export default App;
