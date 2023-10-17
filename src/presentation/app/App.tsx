import "./App.css";
import { compositionRoot } from "../../application/CompositionRoot";
import Environment from "../components/Environment";

function App() {
  return (
    <div id="root">
      <Environment
        controller={compositionRoot.environmentController}
        presenter={compositionRoot.environmentPresenter}
      />
    </div>
  );
}

export default App;
