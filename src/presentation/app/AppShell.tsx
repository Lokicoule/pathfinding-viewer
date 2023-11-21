import { AlgorithmDescriptor } from "@ui/components/algorithm";
import { Environment } from "@ui/components/environment";
import { UserGuide } from "@ui/components/environment/organisms";
import { Layout } from "@ui/components/layout";
import { MazeAlgorithmSelector } from "@ui/components/maze";
import { PathfindingAlgorithmSelector } from "@ui/components/pathfinding";

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
