import UserGuide from "../components/molecules/user-guide/UserGuide";
import { AlgorithmDescriptor } from "../components/organisms/algorithm/AlgorithmDescriptor";
import MazeAlgorithmSelector from "../components/organisms/algorithm/MazeAlgorithmSelector";
import PathfindingAlgorithmSelector from "../components/organisms/algorithm/PathfindingAlgorithmSelector";
import RightSidebar from "../components/organisms/layout/RightSidebar";
import SideBar from "../components/organisms/layout/Sidebar";
import Environment from "../components/templates/Environment";
import Layout from "../components/templates/Layout";

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
