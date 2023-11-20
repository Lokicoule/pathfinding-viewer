type MainContentProps = React.PropsWithChildren;
type MainContentComponent = React.FC<MainContentProps>;

const MainContent: MainContentComponent = ({ children }) => (
  <div className="flex w-full h-full mx-auto px-2 py-4">
    <div className="w-full h-full flex items-center justify-center">
      {children}
    </div>
  </div>
);

export default MainContent;
