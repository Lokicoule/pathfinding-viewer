import {
  SIDEBAR_MAX_WIDTH,
  SIDEBAR_MIN_WIDTH,
} from "../../../shared/constants";
import MazeAlgorithmSelector from "../molecules/algorithm/MazeAlgorithmSelector";
import PathfindingAlgorithmSelector from "../molecules/algorithm/PathfindingAlgorithmSelector";
import ResizableSidebar from "../molecules/layout/ResizableSidebar";
import UserGuide from "../molecules/user-guide/UserGuide";
import { AlgorithmDescriptor } from "../organisms/algorithm/AlgorithmDescriptor";

type LayoutProps = React.PropsWithChildren;
type LayoutComponent = React.FC<LayoutProps>;

const Layout: LayoutComponent = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col sm:overflow-hidden">
        <header className="flex flex-col items-center px-4 pt-4 pb-1">
          <div className="flex justify-center items-center w-full">
            <h1 className="text-white text-center text-2xl font-semibold font-primary cursor-default">
              Pathfinding & Maze Generation Visualizer
            </h1>
            <span className="text-white font-primary ml-2 mt-2 text-center text-xs ">
              by{" "}
              <a
                className="hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-sky-400 to-blue-500 cursor-pointer"
                href="https://github.com/Lokicoule/pathfinding-viewer"
              >
                Lokicoule
              </a>
            </span>
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
              <div className="w-full flex flex-col items-center  md:justify-center space-y-3">
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
              <div className="w-full flex flex-col items-center  md:justify-center space-y-3">
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
