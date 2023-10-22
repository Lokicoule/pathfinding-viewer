import GridView from "./GridView";

type EnvironmentComponent = React.FC;

const Environment: EnvironmentComponent = () => {
  return (
    <div>
      <GridView />
      <div>
        <button onClick={() => {}}>Reset</button>
      </div>
    </div>
  );
};

export default Environment;
