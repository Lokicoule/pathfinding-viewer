import Card from "../components/molecules/card/Card";
import Maze from "../components/organisms/animation/Maze";
import Pathfinding from "../components/organisms/animation/Pathfinding";
import Environment from "../components/templates/Environment";

type AppShellComponent = React.FC;

const Side = () => {
  return (
    <Card isBlurred>
      <Card.Header>Pathfinding Visualizer</Card.Header>
      <Card.Body>
        <p className="text-center">
          This is a pathfinding visualizer built with React and Typescript. It
          allows you to visualize how pathfinding algorithms work.
        </p>
      </Card.Body>
      <Card.Footer>
        <Maze />
        <Pathfinding />
      </Card.Footer>
    </Card>
  );
};

const AppShell: AppShellComponent = () => {
  return (
    <main className="container mx-auto min-h-screen flex flex-row align-center justify-between">
      <div className="flex flex-col justify-center items-center">
        <Environment />
      </div>
    </main>
  );
};

export default AppShell;
