import React from "react";
import Header from "../organisms/layout/Header";
import MainContent from "../organisms/layout/MainContent";
import RightSidebar from "../organisms/layout/RightSidebar";
import SideBar from "../organisms/layout/Sidebar";

type LayoutProps = React.PropsWithChildren<{
  sidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}>;
type LayoutComponent = React.FC<LayoutProps>;

const Layout: LayoutComponent = ({ sidebar, rightSidebar, children }) => (
  <div className="flex flex-col h-screen">
    <div className="flex-1 flex flex-col sm:overflow-hidden">
      <Header />
      <div className="flex flex-wrap sm:flex-nowrap sm:h-full space-x-1 justify-center">
        <SideBar>{sidebar}</SideBar>
        <div className="flex flex-col w-full overflow-x-hidden overflow-y-auto">
          <MainContent>{children}</MainContent>
        </div>
        <RightSidebar>{rightSidebar}</RightSidebar>
      </div>
    </div>
  </div>
);

export default Layout;
