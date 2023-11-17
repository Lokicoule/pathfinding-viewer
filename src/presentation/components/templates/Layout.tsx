import React from "react";

type LayoutProps = React.PropsWithChildren;
type LayoutComponent = React.FC<LayoutProps>;

const Layout: LayoutComponent = ({ children }) => {
  return (
    <div className="flex flex-col h-screen space-y-2">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex h-full space-x-2">
          <div className="flex w-80 h-full bg-pink-500">
            <div className="w-full flex mx-auto px-6 py-8">
              <div className="w-full h-full flex items-center justify-center text-gray-900 text-xl border-4 border-gray-900 border-dashed">
                Maze Sidebar
              </div>
            </div>
          </div>
          <main className="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto">
            <div className="flex w-full h-full mx-auto px-6 py-8">
              <div className="w-full h-full flex items-center justify-center text-gray-900 text-xl border-4 border-gray-900 border-dashed">
                Grid
              </div>
            </div>
          </main>
          <div className="flex w-80 h-full bg-yellow-400">
            <div className="w-full flex mx-auto px-6 py-8">
              <div className="w-full h-full flex items-center justify-center text-gray-900 text-xl border-4 border-gray-900 border-dashed">
                Pathfinding Rightbar
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex justify-between items-center bg-blue-300 p-7">
        <div className="w-full h-full flex items-center justify-center text-gray-900 text-xl border-4 border-gray-900 border-dashed">
          Player
        </div>
      </footer>
    </div>
  );
};

export default Layout;
