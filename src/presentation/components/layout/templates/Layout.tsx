import { Header, MainContent, RightSidebar, Sidebar } from "../organisms";

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
        <Sidebar>{sidebar}</Sidebar>
        <div className="flex flex-col w-full overflow-x-hidden overflow-y-auto">
          <MainContent>{children}</MainContent>
        </div>
        <RightSidebar>{rightSidebar}</RightSidebar>
      </div>
    </div>
  </div>
);

export default Layout;
