import Environment from "../components/templates/Environment";

type AppShellComponent = React.FC;

const AppShell: AppShellComponent = () => {
  return (
    <main className="h-full w-full min-h-screen flex flex-col justify-start items-center space-y-10">
      <div className="flex flex-row justify-evenly">
        <Environment />
      </div>
    </main>
  );
};

export default AppShell;
