import { compositionRoot } from "../../bootstrapping/bootstrap";
import { MediatorProvider } from "../adapters/mediator/MediatorProvider";
import GridCard from "../components/templates/GridCard";

import "./App.css";

function App() {
  return (
    <MediatorProvider mediator={compositionRoot.mediator}>
      <main className="h-full w-full min-h-screen flex flex-col justify-start items-center space-y-10">
        <div className="flex flex-row justify-evenly">
          <GridCard />
        </div>
      </main>
    </MediatorProvider>
  );
}

export default App;
