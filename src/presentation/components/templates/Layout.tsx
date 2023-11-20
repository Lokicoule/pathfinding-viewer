import {
  SIDEBAR_MAX_WIDTH,
  SIDEBAR_MIN_WIDTH,
  SIDEBAR_WIDTH,
} from "../../../shared/constants";
import MazeAlgorithmSelector from "../molecules/algorithm/MazeAlgorithmSelector";
import PathfindingAlgorithmSelector from "../molecules/algorithm/PathfindingAlgorithmSelector";
import ResizableSidebar from "../molecules/layout/ResizableSidebar";
import UserGuide from "../molecules/user-guide/UserGuide";
import { AlgorithmDescriptor } from "../organisms/algorithm/AlgorithmDescriptor";

type LayoutProps = React.PropsWithChildren;
type LayoutComponent = React.FC<LayoutProps>;

const Layout: LayoutComponent = ({ children }) => {
  const refresh = () => window.location.reload();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col sm:overflow-hidden">
        <header className="flex flex-col items-center px-4 pt-4 pb-1">
          <div className="flex">
            <h1
              className="text-white text-2xl font-semibold cursor-pointer font-primary"
              onClick={refresh}
            >
              Pathfinding & Maze Generation Visualizer
            </h1>
          </div>
        </header>
        <div className="flex flex-wrap sm:flex-nowrap sm:h-full space-x-1 justify-center">
          <ResizableSidebar
            initialWidth={SIDEBAR_MIN_WIDTH}
            minWidth={SIDEBAR_MIN_WIDTH}
            maxWidth={SIDEBAR_MAX_WIDTH}
            className="flex sm:h-full z-10"
          >
            <div className="w-full flex mx-auto pl-4 py-4">
              <div className="w-full flex flex-col items-center  md:justify-between space-y-2">
                <MazeAlgorithmSelector />
                <PathfindingAlgorithmSelector />
              </div>
            </div>
          </ResizableSidebar>
          <div className="flex flex-col w-full overflow-x-hidden overflow-y-auto">
            <div className="flex w-full h-full mx-auto px-2 py-4">
              <div className="w-full h-full flex items-center justify-center">
                {children}
              </div>
            </div>
          </div>
          <ResizableSidebar
            side="right"
            initialWidth={SIDEBAR_MAX_WIDTH}
            minWidth={SIDEBAR_MIN_WIDTH}
            maxWidth={SIDEBAR_MAX_WIDTH}
            className="flex w-80 h-full z-10 hidden md:flex"
          >
            <div className="w-full flex mx-auto pr-4 py-4">
              <div className="w-full flex flex-col items-center space-y-2">
                <UserGuide />
                <AlgorithmDescriptor />
              </div>
            </div>
          </ResizableSidebar>
        </div>
      </div>
    </div>
  );
};

export default Layout;
