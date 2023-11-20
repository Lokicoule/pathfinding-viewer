import {
  SIDEBAR_MAX_WIDTH,
  SIDEBAR_MIN_WIDTH,
} from "../../../../shared/constants";
import ResizableSidebar from "../../molecules/layout/ResizableSidebar";
import SidebarContent from "../../molecules/layout/SidebarContent";

type SideBarProps = React.PropsWithChildren;
type SideBarComponent = React.FC<SideBarProps>;

const SideBar: SideBarComponent = ({ children }) => (
  <ResizableSidebar
    initialWidth={SIDEBAR_MIN_WIDTH}
    minWidth={SIDEBAR_MIN_WIDTH}
    maxWidth={SIDEBAR_MAX_WIDTH}
    className="flex sm:h-full z-10"
  >
    <SidebarContent>{children}</SidebarContent>
  </ResizableSidebar>
);

export default SideBar;
