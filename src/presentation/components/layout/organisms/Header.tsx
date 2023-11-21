type HeaderComponent = React.FC;

const Header: HeaderComponent = () => (
  <header className="flex flex-col items-center px-4 pt-4 pb-1">
    <div className="flex justify-center items-center w-full">
      <h1 className="text-white text-center text-2xl font-semibold font-primary cursor-default">
        Maze Generation & Pathfinding Visualizer
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
);

export default Header;
