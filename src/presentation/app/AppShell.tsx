import UserGuide from "../components/environment/organisms/UserGuide";
import { AlgorithmDescriptor } from "../components/algorithm/organisms/AlgorithmDescriptor";
import MazeAlgorithmSelector from "../components/algorithm/organisms/MazeAlgorithmSelector";
import PathfindingAlgorithmSelector from "../components/algorithm/organisms/PathfindingAlgorithmSelector";
import Environment from "../components/environment/templates/Environment";
import Layout from "../components/layout/templates/Layout";

type AppShellComponent = React.FC;

const AppShell: AppShellComponent = () => (
  <Layout
    sidebar={
      <>
        <MazeAlgorithmSelector />
        <PathfindingAlgorithmSelector />
      </>
    }
    rightSidebar={
      <>
        <UserGuide />
        <AlgorithmDescriptor />
      </>
    }
  >
    <Environment />
  </Layout>
);

export default AppShell;
