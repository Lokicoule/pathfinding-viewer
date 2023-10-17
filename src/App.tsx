import "./App.css";
import { compositionRoot } from "./application/composition";
import Environment from "./components/Environment";

function App() {
  return <Environment controller={compositionRoot.environmentController} />;
}

export default App;
