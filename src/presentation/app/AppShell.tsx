import { AlgorithmDescriptor } from "../components/algorithm";
import { Environment } from "../components/environment";
import { UserGuide } from "../components/environment/organisms";
import { Layout } from "../components/layout";
import { MazeAlgorithmSelector } from "../components/maze";
import { PathfindingAlgorithmSelector } from "../components/pathfinding";

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
