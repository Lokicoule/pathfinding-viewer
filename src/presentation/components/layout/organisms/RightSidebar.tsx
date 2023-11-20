import {
  SIDEBAR_MAX_WIDTH,
  SIDEBAR_MIN_WIDTH,
} from "../../../../shared/constants";
import ResizableSidebar from "../molecules/ResizableSidebar";
import SidebarContent from "../molecules/SidebarContent";

type RightSidebarProps = React.PropsWithChildren;
type RightSidebarComponent = React.FC<RightSidebarProps>;

const RightSidebar: RightSidebarComponent = ({ children }) => (
  <ResizableSidebar
    side="right"
    initialWidth={SIDEBAR_MAX_WIDTH}
    minWidth={SIDEBAR_MIN_WIDTH}
    maxWidth={SIDEBAR_MAX_WIDTH}
    className="flex w-80 h-full z-10 hidden md:flex"
  >
    <SidebarContent position="right">{children}</SidebarContent>
  </ResizableSidebar>
);

export default RightSidebar;
