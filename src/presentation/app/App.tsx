import { compositionRoot } from "../../bootstrapping/bootstrap";
import { MediatorProvider } from "../adapters/mediator/MediatorProvider";
import Experience from "../components/Experience";

import "./App.css";

function App() {
  return (
    <MediatorProvider mediator={compositionRoot.mediator}>
      <div className="container">
        <div className="header">
          <h1>Pathfinding Visualizer</h1>
        </div>
        <div className="content">
          <Experience />
        </div>
      </div>
    </MediatorProvider>
  );
}

export default App;
